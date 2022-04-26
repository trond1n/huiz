import axios from "../../axios/axios-quiz";
import React, { useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/formFramework";

import classes from "./QuizCreator.module.css";

const createOptionControl = (num) => {
  return createControl(
    {
      label: `Вариант ${num}`,
      errorMessage: "Значение не может быть пустым",
      id: num,
    },
    { required: true }
  );
};
const createFormControls = () => {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
};

const QuizCreator = (props) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [rightAnswerId, setRightAnswerId] = useState(1);
  const [quiz, setQuiz] = useState([]);
  const [formControls, setFormControls] = useState(createFormControls());
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const addQuestionHandler = (e) => {
    e.preventDefault();
    const quizData = quiz.concat();
    const index = quizData.length + 1;
    const { question, option1, option2, option3, option4 } = formControls;
    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerIdx: rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };
    quizData.push(questionItem);

    setQuiz(quizData);
    setIsFormValid(false);
    setRightAnswerId(1);
    setFormControls(createFormControls());
  };
  const createQuizHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("quizes.json", quiz);

      setQuiz([]);
      setIsFormValid(false);
      setRightAnswerId(1);
      setFormControls(createFormControls());
    } catch (e) {
      console.log(e);
    }
  };
  const selectChangeHandler = (e) => {
    setRightAnswerId(+e.target.value);
  };
  const changeHandler = (value, controlName) => {
    const formControlsData = { ...formControls };
    const control = { ...formControlsData[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);
    formControlsData[controlName] = control;

    setFormControls(formControlsData);
    setIsFormValid(validateForm(formControlsData));
  };
  const renderControls = () => {
    return Object.keys(formControls).map((controlName, idx) => {
      const control = formControls[controlName];
      return (
        <>
          <Input
            key={controlName + idx}
            label={control.label}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={(e) => changeHandler(e.target.value, controlName)}
          />
          {idx === 0 ? <hr key={idx}/> : null}
        </>
      );
    });
  };

  const select = (
    <Select
      label="Выберите правильный ответ"
      value={rightAnswerId}
      onChange={selectChangeHandler}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 },
      ]}
    />
  );

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>
        <form onSubmit={submitHandler}>
          {renderControls()}
          {select}
          <Button
            type="primary"
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Добавить вопрос
          </Button>
          <Button
            type="success"
            onClick={createQuizHandler}
            disabled={quiz.length === 0}
          >
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  );
};
export default QuizCreator;
