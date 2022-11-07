const { getSheetCells } = require("../../lib/googleSheet");
const { SHEET_MAP } = require("../../config");

export default async function handler(req, res) {
  const sheet = await getSheetCells(0, "A1:C11");

  const { votes } = req.body;
  for (const [key, value] of Object.entries(votes)) {
    const cell = sheet.getCellByA1(SHEET_MAP[key][value]);
    const prevValue = cell.value;
    cell.value = prevValue + 1; // set the value of cell
  }

  await sheet.saveUpdatedCells();

  res.status(200).json({ status: 200 });
}
