import fs from 'fs';
import csv from 'csv-parser';
import { Readable } from 'stream';

export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    // Read the entire file to find where the actual CSV headers start
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    
    let headerIndex = 0;
    // Look for a line that starts with Date or "Date" to skip junk metadata at the top
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim().toLowerCase();
      if (line.startsWith('date') || line.startsWith('"date"')) {
        headerIndex = i;
        break;
      }
    }
    
    // Create a new string with just the CSV data
    const csvData = lines.slice(headerIndex).join('\n');
    
    // Create a readable stream from the string
    const stream = Readable.from(csvData);

    stream
      .pipe(csv({ mapHeaders: ({ header }) => header ? header.trim() : header }))
      .on('data', (data) => {
        const rawDate = data.Date || data.date || data['Txn Date'] || data['Transaction Date'];
        const description = data['Transaction Details'] || data.Description || data.description || data.Narration || data.Remarks || '';
        const rawAmount = data.Amount || data.amount || data.Withdrawal || data.Deposit || data.Debit || data.Credit;
        const rawBalance = data.Balance || data.balance || data['Available Balance'] || data['Closing Balance'] || data['Account Balance'] || '';
        
        let type = data['Transaction Type'] || data.Type || data.type || '';
        let amount = parseFloat(String(rawAmount).replace(/[^\d.-]/g, ''));
        let balance = parseFloat(String(rawBalance).replace(/[^\d.-]/g, ''));

        if (isNaN(amount)) return;
        if (isNaN(balance)) balance = null;

        let upiId = null;
        if (description.startsWith('Paid to ')) {
             type = 'Debit';
             upiId = description.replace('Paid to ', '').trim();
         } else if (description.startsWith('Received from ')) {
             type = 'Credit';
             upiId = description.replace('Received from ', '').trim();
         } else {
             const upiMatch = description.match(/UPI\/([^\/]+)\/([^\/]+)/i) || description.match(/@([a-zA-Z0-9]+)/);
             if (upiMatch) {
                 upiId = upiMatch[2] || upiMatch[0]; 
             }
         }
         
        const time = data.Time || data.time || '';
        const transactionId = data['Transaction ID'] || data['Txn ID'] || data['Transaction No'] || data['Reference No'] || '';
        const utr = data.UTR || data['UTR No.'] || data['UTR Number'] || '';
        const instrument = data['Credit/debit instrument'] || data.Instrument || '';

        if (rawDate && amount) {
          results.push({
            date: rawDate,
            time,
            description,
            transactionId,
            utr,
            instrument,
            amount: Math.abs(amount),
            balance: balance !== null ? Math.abs(balance) : null,
            type: type.toLowerCase().includes('deb') ? 'Debit' : 'Credit',
            upiId: upiId || 'Other'
          });
        }
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};
