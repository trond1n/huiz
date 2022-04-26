import axios from "axios";
import is from "is_js";
import React, { useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";

const Auth = (props) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formControls, setFormControls] = useState({
    email: {
      value: "",
      type: "email",
      label: "Email",
      errorMessage: "Введите корректный e-mail.",
      valid: false,
      touched: false,
      validation: { required: true, email: true },
    },
    password: {
      value: "",
      type: "password",
      label: "Пароль",
      errorMessage: "Введите корректный пароль.",
      valid: false,
      touched: false,
      validation: { required: true, minLength: 6 },
    },
  });

  const loginHandler = async () => {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-lwxD0VzQOUlg4XAFysQHuFzvm5Ysl5M",
        authData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const registerHandler = async () => {
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-lwxD0VzQOUlg4XAFysQHuFzvm5Ysl5M",
        authData
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.email) {
      isValid = is.email(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  };
  const onChangeHandler = (e, controlName) => {
    const formControlsData = { ...formControls };
    const control = { ...formControlsData[controlName] };
    control.value = e.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
    formControlsData[controlName] = control;

    let isFormValidCheck = true;
    Object.keys(formControlsData).forEach((name) => {
      isFormValidCheck = formControls[name].valid && isFormValidCheck;
    });

    setFormControls(formControlsData);
    setIsFormValid(isFormValidCheck);
  };
  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(e) => onChangeHandler(e, controlName)}
        />
      );
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>
        <form onSubmit={submitHandler} className={classes.AuthForm}>
          {renderInputs()}

          <Button disabled={!isFormValid} type="success" onClick={loginHandler}>
            Войти
          </Button>
          <Button
            type="primary"
            disabled={!isFormValid}
            onClick={registerHandler}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Auth;
