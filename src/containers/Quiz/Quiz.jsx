import axios from "../../axios/axios-quiz";
import React, { useEffect, useState } from "react";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import classes from "./Quiz.module.css";
import Loader from "../../components/UI/Loader/Loader";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const { id } = useParams();
  const [results, setResults] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState([]);

  const onAnswerClickHandler = (answerId) => {
    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (answerState[key] === "success") {
        return;
      }
    }
    const question = quiz[activeQuestion];
    const score = results;
    if (question.rightAnswerId === answerId) {
      if (!score[question.id]) {
        score[question.id] = "success";
      }

      setAnswerState({ [answerId]: "success" });
      setResults(score);

      const timeout = window.setTimeout(() => {
        if (isQuzFinished()) {
          setIsFinished(true);
        } else {
          setActiveQuestion(activeQuestion + 1);
          setAnswerState(null);
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      score[question.id] = "error";
      setAnswerState({ [answerId]: "error" });
      setResults(score);
    }
  };
  const isQuzFinished = () => {
    return activeQuestion + 1 === quiz.length;
  };
  const retryHandler = () => {
    setActiveQuestion(0);
    setAnswerState(null);
    setIsFinished(false);
    setResults({});
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`quizes/${id}.json`);
      setQuiz(response.data);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>

        {loading ? (
          <Loader />
        ) : isFinished ? (
          <FinishedQuiz results={results} quiz={quiz} onRetry={retryHandler} />
        ) : (
          <ActiveQuiz
            answers={quiz[activeQuestion].answers}
            question={quiz[activeQuestion].question}
            onAnswerClick={onAnswerClickHandler}
            quizLength={quiz.length}
            answerNumber={activeQuestion + 1}
            state={answerState}
          />
        )}
      </div>
    </div>
  );
};
export default Quiz;
