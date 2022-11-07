const { GoogleSpreadsheet } = require("google-spreadsheet");

async function getSheetCells(sheetIndex, cells) {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
  });

  await doc.getInfo();
  const sheet = doc.sheetsByIndex[sheetIndex];
  await sheet.loadCells(cells);

  return sheet;
}

export { getSheetCells };

//   const { votes } = req.body;
//   for (const [key, value] of Object.entries(votes)) {
//     const cell = sheet.getCellByA1(SHEET_MAP[key][value]);
//     const prevValue = cell.value;
//     cell.value = prevValue + 1; // set the value of cell
//   }

//   await sheet.saveUpdatedCells();

//   const data = {};
//   for (const key of Object.keys(SHEET_MAP)) {
//     let polls = {};
//     for (const [keyVote, valVote] of Object.entries(SHEET_MAP[key])) {
//       const cell = sheet.getCellByA1(valVote);
//       polls[keyVote] = cell.value;
//     }
//     data[key] = polls;
//   }
//   res.status(200).json({ status: 200, data });
// }
