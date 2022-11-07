import React, { Fragment, useState, useEffect } from "react";
import Layout from "../components/layout";
import Skeleton from "../components/skeleton";
import utilStyles from "../styles/utils.module.scss";
const { QUESTIONS } = require("../config");

function Result() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const respon = await fetch("/api/getVote");
        const { data } = await respon.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) return <div>failed to load</div>;

  const showValue = (data, questionId, optionId) => {
    if (isLoading) return <Skeleton style={{ width: "3rem" }} />;
    return <div>{data && data[questionId][optionId]}</div>;
  };

  return (
    <Layout>
      {QUESTIONS.map(({ question, options, id }) => {
        return (
          <Fragment key={id}>
            <h3>{question}</h3>
            {options.map((opt) => (
              <div className={utilStyles.flexRow} key={opt.id}>
                <div>{opt.name} :</div>&nbsp;&nbsp;
                {showValue(data, id, opt.id)}
              </div>
            ))}
          </Fragment>
        );
      })}
    </Layout>
  );
}

export default Result;
