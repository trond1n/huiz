import React from "react";
import classes from "./Input.module.css";
const IsInvalid = ({ valid, touched, shouldValidate }) => {
  return !valid && shouldValidate && touched;
};
const Input = (props) => {
  const inputType = props.type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;
  if (IsInvalid(props)) {
    cls.push(classes.invalid);
  }
  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input type={inputType} value={props.value} onChange={props.onChange} />
      {IsInvalid(props) ? (
        <span>{props.errorMessage || "введите верное значение"}</span>
      ) : null}
    </div>
  );
};
export default Input;
