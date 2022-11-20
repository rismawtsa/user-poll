const { getSheetCells } = require("../../lib/googleSheet");
const { SHEET_MAP } = require("../../config");

export default async function handler(req, res) {
  const sheet = await getSheetCells(0, "A1:C11");

  let data = {};
  for (const key of Object.keys(SHEET_MAP)) {
    let votes = {};
    let total = 0;
    let max = 0;
    for (const [keyVote, valVote] of Object.entries(SHEET_MAP[key])) {
      const count = sheet.getCellByA1(valVote);
      total += count.value;
      max = Math.max(max, count.value);
    }

    for (const [keyVote, valVote] of Object.entries(SHEET_MAP[key])) {
      const count = sheet.getCellByA1(valVote);
      votes[keyVote] = {
        value: count.value,
        percent: Number((count.value * 100) / total).toFixed(2),
        isMax: count.value >= max,
      };
    }
    data[key] = { total, votes };
  }

  res.status(200).json({ status: 200, data });
}
