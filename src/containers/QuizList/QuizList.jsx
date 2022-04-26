import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

import classes from "./QuizList.module.css";

const QuizList = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderQuizes = () => {
    return quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("quizes.json");
      const quizesData = [];
      Object.keys(response.data).forEach((key, index) => {
        quizesData.push({ id: key, name: `Тест №${index + 1}` });
        setQuizes(quizesData);
        setLoading(false);
      });
    }
    fetchData();
  }, []);

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        {loading ? <Loader /> : <ul>{renderQuizes()}</ul>}
      </div>
    </div>
  );
};
export default QuizList;
