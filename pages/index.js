import React, { Fragment, useState } from "react";
import { QUESTIONS } from "../config";
import styles from "../styles/home.module.scss";

function HomePage() {
  const [votes, setVotes] = useState({});

  const handleClick = (questionId, optionId) => {
    setVotes({ ...votes, [questionId]: optionId });
    console.log({ votes });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/createVote");
      const result = await response.json();
      console.log({ result });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
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
      <button onClick={() => handleSubmit()}>Submit</button>
    </>
  );
}

export default HomePage;
