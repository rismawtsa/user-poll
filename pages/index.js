import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import Card from "../components/card";
import Button from "../components/button";
import styles from "../styles/home.module.scss";

import { QUESTIONS } from "../config";
const questionLength = QUESTIONS.length;

function HomePage() {
  const router = useRouter();
  const [votes, setVotes] = useState({});
  const [isSubmit, setIsSubmit] = useState(null);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleClick = (questionId, optionId) => {
    setVotes({ ...votes, [questionId]: optionId });

    setError(null);
  };

  const handlePrevClick = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleNextClick = () => {
    setCurrentQuestion(currentQuestion + 1);
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

  const generateNextArrow = () => {
    if (currentQuestion < questionLength && votes[currentQuestion]) {
      return (
        <button
          className={styles.next}
          onClick={() => handleNextClick()}
        >{`>`}</button>
      );
    }
  };

  const generateQuestion = () => {
    const data = QUESTIONS.find((item) => item.id === currentQuestion);

    return (
      <>
        <h3 className={styles.question}>{data.question}</h3>
        <div className={styles.optionContainer}>
          <div className={styles.arrowContainer}>
            {currentQuestion > 1 && (
              <button
                className={styles.prev}
                onClick={() => handlePrevClick()}
              >{`<`}</button>
            )}
          </div>
          <div>
            {data.options.map((opt) => {
              const { name, id } = opt;
              let btnStyle = styles.voteButton;
              if (votes[data.id] === id) btnStyle = styles.voteButtonActive;
              return (
                <Button
                  key={id}
                  className={btnStyle}
                  onClick={() => handleClick(data.id, id)}
                >
                  {name}
                </Button>
              );
            })}
          </div>
          <div className={styles.arrowContainer}>{generateNextArrow()}</div>
        </div>
      </>
    );
  };

  return (
    <Layout home error={error}>
      <Card className={styles.card}>
        {generateQuestion()}
        <div className={styles.submitContainer}>
          {currentQuestion === questionLength && (
            <Button onClick={() => handleSubmit()} disabled={isSubmit}>
              Submit
            </Button>
          )}
          {isSubmit && (
            <img
              className={styles.spinner}
              src="/images/spinner.gif"
              alt="loader"
            />
          )}
        </div>
      </Card>
    </Layout>
  );
}

export default HomePage;
