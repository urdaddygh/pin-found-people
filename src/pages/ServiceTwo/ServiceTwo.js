import React from "react";
import s from "./ServiceTwo.module.scss";
import { useFormik } from "formik";
import Input from "../../components/input/Input";
import { useDispatch } from "react-redux";
import Button from "../../components/button/Button";

const ServiceTwo = () => {
  const dispatch = useDispatch;

  const formik = useFormik({
    initialValues: {
      pin: "",
    },

    onSubmit: (values) => {
      console.log(values);
      let data = { values };
      // dispatch(postAuth(data));
    },
  });
  return (
    <div className={s.cont}>
      <p>Поиск информации о семейном положении гражданина</p>
      <Input
        value={formik.values.pin}
        name="pin"
        placeholder="Введите пин"
        type="number"
        onChange={formik.handleChange}
      />
      <Button type="submit" disabled={!formik.values.pin} text="ПОИСК" />
    </div>
  );
};

export default ServiceTwo;
