import fs from 'fs';

export const parsePDF = async (filePath) => {
  // Use dynamic import to safely load the CommonJS module
  const pdfParseModule = await import('pdf-parse/lib/pdf-parse.js');
  const pdfParse = pdfParseModule.default || pdfParseModule;

  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  
  const text = data.text;
  const results = [];

  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  let currentPhonePeTxn = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // PhonePe Date Format (e.g. Aug 05, 2026)
    // Exclude header strings like "Duration, 07 May 2026 - 05 Aug, 2026"
    const phonePeDateMatch = line.match(/([A-Z][a-z]{2}\s\d{2},\s\d{4})/i);
    
    if (phonePeDateMatch && !line.toLowerCase().includes('duration')) {
      if (currentPhonePeTxn && currentPhonePeTxn.amount !== null) {
          results.push({ ...currentPhonePeTxn });
      }

      currentPhonePeTxn = {
        date: phonePeDateMatch[1],
        description: 'Unknown',
        amount: null,
        type: 'Unknown',
        upiId: 'Other'
      };
      // We do not `continue` here because pdf-parse might smash the description onto the same line as the date!
    }

    if (currentPhonePeTxn) {
       // Look for Description
       if (line.includes('Paid to ')) {
           currentPhonePeTxn.type = 'Debit';
           currentPhonePeTxn.description = line;
           currentPhonePeTxn.upiId = line.substring(line.indexOf('Paid to ') + 8).trim();
       } else if (line.includes('Received from ')) {
           currentPhonePeTxn.type = 'Credit';
           currentPhonePeTxn.description = line;
           currentPhonePeTxn.upiId = line.substring(line.indexOf('Received from ') + 14).trim();
       }

       // Look for explicit Type
       if (line === 'DEBIT' || line === 'D') currentPhonePeTxn.type = 'Debit';
       if (line === 'CREDIT' || line === 'C') currentPhonePeTxn.type = 'Credit';

       // Amount extraction
       const prevLine = i > 0 ? lines[i-1] : '';
       if (
          line.includes('₹') || 
          line.includes('Rs') ||
          prevLine === 'Amount' || 
          prevLine === 'DEBIT' || 
          prevLine === 'CREDIT' || 
          prevLine === 'C' || 
          prevLine === 'D'
       ) {
          const parsedAmount = parseFloat(line.replace(/[^\d.]/g, ''));
          if (!isNaN(parsedAmount) && parsedAmount > 0) {
             currentPhonePeTxn.amount = parsedAmount;
          }
       }
    }

    // Standard Single-Line Bank Statement Fallback
    const dateMatch = line.match(/(\d{2}[/-]\d{2}[/-]\d{2,4})/);
    if (!currentPhonePeTxn && dateMatch) {
      const date = dateMatch[1];
      const amountMatch = line.match(/(\d+(?:\.\d{2})?)\s*(Cr|Dr)?$/i);
      
      if (amountMatch) {
        const amount = parseFloat(amountMatch[1]);
        const typeInd = amountMatch[2];
        let type = 'Unknown';
        if (typeInd) {
           type = typeInd.toLowerCase() === 'cr' ? 'Credit' : 'Debit';
        } else {
           type = 'Debit'; 
        }

        const descriptionRaw = line.substring(dateMatch.index + dateMatch[0].length, amountMatch.index).trim();
        
        let upiId = null;
        const upiMatch = descriptionRaw.match(/UPI\/[^\/]+\/([^\/]+)/i);
        if (upiMatch) {
            upiId = upiMatch[1];
        }

        results.push({
          date,
          description: descriptionRaw,
          amount,
          type,
          upiId: upiId || 'Other'
        });
      }
    }
  }

  // Push the final transaction if one was being built when the file ended
  if (currentPhonePeTxn && currentPhonePeTxn.amount !== null) {
      results.push({ ...currentPhonePeTxn });
  }

  return results;
};
