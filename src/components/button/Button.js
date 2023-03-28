import React from "react";
import s from "./Button.module.scss";

const Button = ({ disabled, text = "", type, width, margin, onClick }) => {
  return (
    <button
      disabled={disabled}
      className={s.button}
      type={type}
      style={{ width: width, margin: margin }}
      onClick={onClick}
      data-clipboard-target="#foo"
    >
      {text}
    </button>
  );
};

export default Button;
