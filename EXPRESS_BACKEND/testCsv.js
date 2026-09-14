const csv = require('csv-parser');
const { Readable } = require('stream');

const fileContent = `Transaction Statement for 8271822796
Duration,"07 May, 2026 - 05 Aug, 2026"

Date,Time,Transaction Details,Transaction ID,UTR,Transaction Type,Credit/debit instrument,Amount
"Aug 05, 2026","06:16 pm","Paid to Ajay Kumar","T2608051816061724482386","102792921860","DEBIT","Paid by XXXXXXXXXX2796","159"`;

const lines = fileContent.split('\n');
let headerIndex = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim().toLowerCase();
  if (line.startsWith('date') || line.startsWith('"date"')) {
    headerIndex = i;
    break;
  }
}

const csvData = lines.slice(headerIndex).join('\n');
const results = [];

Readable.from(csvData)
  .pipe(csv())
  .on('data', (data) => {
    results.push(data);
  })
  .on('end', () => {
     console.log("Parsed rows:", results);
  });
