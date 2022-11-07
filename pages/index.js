import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import styles from "../styles/home.module.scss";

import { QUESTIONS } from "../config";

function HomePage() {
  const router = useRouter();
  const [votes, setVotes] = useState({});
  const [isSubmit, setIsSubmit] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = (questionId, optionId) => {
    setVotes({ ...votes, [questionId]: optionId });
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      setIsSubmit(true);
      const response = await fetch("/api/createVote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      router.push("/result");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <Layout home error={error}>
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
