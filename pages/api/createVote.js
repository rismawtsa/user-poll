const { GoogleSpreadsheet } = require("google-spreadsheet");

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

export default async function handler(req, res) {
  const id = "frontend_development";
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
  });

  await doc.getInfo();
  const sheet = doc.sheetsByIndex[0];
  // const rows = await sheet.getRows();
  // await loadHeaderRow
  // const rawData = rows[1]._rawData;
  // const headerValues = rows[1]._sheet.headerValues;
  // const rowValue = rows[0][id];

  await sheet.loadCells("A1:C11");
  const a3 = sheet.getCellByA1("A3");

  console.log({ value: a3.value });

  // rows[0][id] = Number(rowValue) + 1;
  // await rows[0].save();

  res.status(200).json({ status: 200 });
}
