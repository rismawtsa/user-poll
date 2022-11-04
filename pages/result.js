import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { SHEET_MAP, QUESTIONS } = require("../config");

function Result({ data }) {
  const router = useRouter();
  console.log({ router });
  return (
    <Layout>
      {QUESTIONS.map(({ question, options, id }) => {
        return (
          <Fragment key={id}>
            <h3>{question}</h3>
            {options.map((opt) => (
              <div key={opt.id}>
                {opt.name} : {data[id][opt.id]}
              </div>
            ))}
          </Fragment>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
  });

  await doc.getInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.loadCells("A1:C11");

  let data = {};
  for (const key of Object.keys(SHEET_MAP)) {
    let votes = {};
    for (const [keyVote, valVote] of Object.entries(SHEET_MAP[key])) {
      const cell = sheet.getCellByA1(valVote);
      votes[keyVote] = cell.value;
    }
    data[key] = votes;
  }

  return { props: { data } };
}

export default Result;
