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
  const rows = await sheet.getRows();
  const rawData = rows[0]._rawData;
  const headerValues = rows[0]._sheet.headerValues;
  const rowValue = rows[0][id];

  rows[0][id] = Number(rowValue) + 1;
  await rows[0].save();

  res.status(200).json({ name: "Risma" });
}
