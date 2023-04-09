import React, { useRef } from "react";
import s from "./ServiceTwo.module.scss";
import { useFormik } from "formik";
import Input from "../../components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button/Button";
import { postGetFamily } from "../../redux/slices/citizenInfo";
import { useReactToPrint } from "react-to-print";

const ServiceTwo = () => {
  const dispatch = useDispatch();

  const family = useSelector((state) => state.sitizen.family);
  console.log(family);

  const formik = useFormik({
    initialValues: {
      pin: "",
    },

    onSubmit: (values) => {
      console.log(values);
      dispatch(postGetFamily(values));
    },
  });


  const compRef = useRef()

  const handlePrint = useReactToPrint({
    content:()=>compRef.current
  })



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

      <div>
      <Button
        type="submit"
        disabled={!formik.values.pin}
        text="ПОИСК"
        onClick={formik.handleSubmit}
        margin="0 20px 0 0"
      />
      <Button  text="Распечатать" onClick={handlePrint} />
      </div>
      <div ref={compRef}>
      {family === null ? (
        <p>Гражданин не найден</p>
      ) : (
        <>
        <p>{formik.values.pin}</p>
        {family.map((el, index) => (
          <div className={s.info_cont} key={index}>
            <p>ФИО: {el.name}</p>
            <p>ПИН: {el.pin}</p>
            <p>Роль: {el.role}</p>
          </div>
        ))}
        </>
      )}
      </div>
    </div>
  );
};

export default ServiceTwo;
