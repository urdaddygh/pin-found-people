import React from "react";
import s from "./ServiceOne.module.scss";
import { useFormik } from "formik";
import Input from "../../components/input/Input";
import { useDispatch } from "react-redux";
import Button from "../../components/button/Button";

const ServiceOne = () => {
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
      <p>Поиск фактического места жительства гражданина</p>
      <form>
        <Input
          value={formik.values.pin}
          name="pin"
          placeholder="Введите пин"
          onChange={formik.handleChange}
          type="number"
        />
        <Button type="submit" disabled={!formik.values.pin} text='ПОИСК'/>
      </form>
    </div>
  );
};

export default ServiceOne;
