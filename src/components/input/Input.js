import React from "react";
import s from "./Input.module.scss";

const Input = ({
  placeholder,
  value,
  valueLabel,
  onChange,
  name,
  type,
  maxWidth,
  width,
  margin,
  minWidth,
  minHeight,
    background,
    padding,
    readOnly,
    id,
    marginLabel
}) => {

  return (
    <div className={s.input_container}>
      <label className={s.label} style={{margin:marginLabel}}>{valueLabel}</label>
      <div className={s.gradient} style={{ background: background ,maxWidth:maxWidth, width:width, marginInput:margin, minWidth:minWidth, minHeight:minHeight}}>
        <input
          style={{padding:padding}}
          className={s.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          readOnly = {readOnly}
          id={id}
        />
      </div>
    </div>
  );
};

export default Input;
