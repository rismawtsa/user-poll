const { getSheetCells } = require("../../lib/googleSheet");
const { SHEET_MAP } = require("../../config");

export default async function handler(req, res) {
  const sheet = await getSheetCells(0, "A1:C11");

  let data = {};
  for (const key of Object.keys(SHEET_MAP)) {
    let votes = {};
    for (const [keyVote, valVote] of Object.entries(SHEET_MAP[key])) {
      const cell = sheet.getCellByA1(valVote);
      votes[keyVote] = cell.value;
    }
    data[key] = votes;
  }

  res.status(200).json({ status: 200, data });
}
