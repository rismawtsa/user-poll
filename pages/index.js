import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import queryString from "query-string";
import Layout from "../components/layout";
import styles from "../styles/home.module.scss";

import { QUESTIONS } from "../config";

function HomePage() {
  const router = useRouter();
  const [votes, setVotes] = useState({});
  const [isSubmit, setIsSubmit] = useState(null);

  const handleClick = (questionId, optionId) => {
    setVotes({ ...votes, [questionId]: optionId });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmit(true);
      const response = await fetch("/api/createVote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes }),
      });
      await response.json();
      router.push("/result");
    } catch (error) {
      console.log({ error });
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <Layout home>
      {QUESTIONS.map((item, index) => {
        const { question, id: questionId, options } = item;
        return (
          <Fragment key={index}>
            <h3>{question}</h3>
            <div>
              {options.map((opt) => {
                const { name, id } = opt;
                const btnStyle =
                  votes[questionId] === id
                    ? styles.voteButtonActive
                    : styles.voteButton;
                return (
                  <button
                    key={id}
                    className={btnStyle}
                    onClick={() => handleClick(questionId, id)}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </Fragment>
        );
      })}
      <br />
      <div>
        <button onClick={() => handleSubmit()} disabled={isSubmit}>
          Submit
        </button>
        {isSubmit && (
          <img
            className={styles.spinner}
            src="/images/spinner.gif"
            alt="loader"
          />
        )}
      </div>
    </Layout>
  );
}

export default HomePage;
