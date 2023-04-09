import React, { useRef } from "react";
import s from "./ServiceOne.module.scss";
import { useFormik } from "formik";
import Input from "../../components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button/Button";
import { postGetAdress } from "../../redux/slices/citizenInfo";
import { useReactToPrint } from 'react-to-print';

const ServiceOne = () => {
  const dispatch = useDispatch();

  const adress = useSelector((state) => state.sitizen);

  console.log(adress);
  const formik = useFormik({
    initialValues: {
      pin: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      dispatch(postGetAdress(values));
    },
  });

  const compRef = useRef()

  const handlePrint = useReactToPrint({
    content:()=>compRef.current
  })


  return (
    <div className={s.cont}>
      <p>Поиск фактического места жительства гражданина</p>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.inp}>
        <Input
          value={formik.values.pin}
          name="pin"
          placeholder="Введите пин"
          onChange={formik.handleChange}
          type="number"

        />
</div>
        <Button type="submit" disabled={!formik.values.pin} text="ПОИСК" margin="0 20px 0 0"/>
        <Button text="Распечатать" onClick={handlePrint} />
          <div className={s.info_cont} ref={compRef}>
            <p>ПИН: {adress.adress.pin}</p>
            <p>Область: {adress.adress.state}</p>
            <p>Регион: {adress.adress.region}</p>
            <p>Район: {adress.adress.district}</p>
            <p>Город/Село/ПГТ: {adress.adress.city}</p>
            <p>Улица: {adress.adress.street}</p>
            <p>Номер дома: {adress.adress.house}</p>
            <p>Номер квартиры: {adress.adress.flat}</p>
          </div>


      </form>
    </div>
  );
};

export default ServiceOne;
