import React, { Fragment, useState, useEffect } from "react";
import Layout from "../components/layout";
import Skeleton from "../components/skeleton";
import Card from "../components/card";
import styles from "../styles/result.module.scss";
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
        setError("Oop! There is something wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const showValue = (questionId, option) => {
    if (isLoading)
      return (
        <Skeleton style={{ marginBottom: "0.5rem" }}>
          <div style={{ width: "83%" }}></div>
          <div style={{ width: "15%" }}></div>
        </Skeleton>
      );

    const vote = data ? data[questionId].votes[option.id] : {};

    let resultBarStyle = styles.resultBar;
    if (vote.isMax) {
      resultBarStyle = styles.resultBarMax;
    }
    return (
      <li className={styles.resultWrapper} key={option.id}>
        <div
          className={resultBarStyle}
          style={{
            width: `${vote.percent ?? 0}%`,
          }}
        ></div>
        <div className={styles.resultItem}>{option.name}</div>
        <div className={styles.resultItem}>{vote.percent ?? 0}%</div>
      </li>
    );
  };

  const showTotalVotes = (questionId) => {
    if (isLoading)
      return (
        <Skeleton>
          <div style={{ width: "3rem" }}></div>
        </Skeleton>
      );
    return (
      <div className={styles.total}>{data && data[questionId].total} votes</div>
    );
  };

  return (
    <Layout error={error}>
      <Card>
        {QUESTIONS.map(({ question, options, id }) => {
          return (
            <Fragment key={id}>
              <h3>{question}</h3>
              <ul className={styles.resultWrapper}>
                {options.map((opt) => showValue(id, opt))}
                {showTotalVotes(id)}
              </ul>
            </Fragment>
          );
        })}
      </Card>
    </Layout>
  );
}

export default Result;
