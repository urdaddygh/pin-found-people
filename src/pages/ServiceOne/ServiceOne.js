import React, { useEffect, useRef, useState } from "react";
import s from "./ServiceOne.module.scss";
import { useFormik } from "formik";
import Input from "../../components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button/Button";
import { postGetAdress } from "../../redux/slices/citizenInfo";
import { useReactToPrint } from "react-to-print";
import moment, { Moment } from "moment/moment";
import { getUsers } from "../../redux/slices/getUsers";
// import 'bootstrap/dist/css/bootstrap.min.css'

const ServiceOne = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    // console.log(id)
    dispatch(getUsers(id));
  }, []);

  const adress = useSelector((state) => state.sitizen);
  const user = useSelector((state) => state.users.usersInfo);
  const date = moment().format('MMMM Do YYYY, h:mm:ss a');

  const [state, setState] = useState(false);

  console.log(adress);
  const formik = useFormik({
    initialValues: {
      pin: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      dispatch(postGetAdress(values));
      // setState(false)
    },
  });

  const compRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => compRef.current,
  });

  const handleClick =()=>{
    setState(true)
    setTimeout(() => handlePrint(), 10);
    // handlePrint()
  }

  return (
    <>
      <div className={s.cont}>
        <p>Поиск информации о фактическом месте жительства гражданина</p>
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
          <Button
            type="submit"
            disabled={!formik.values.pin}
            text="ПОИСК"
            margin="0 20px 0 0"
          />
          <Button text="Распечатать" onClick={handleClick} />
        </form>
      </div>

      <div className={s.info_cont} ref={compRef}>
        <p> ПИН: {adress.adress.pin}</p>
        <p> Область: {adress.adress.state}</p>
        <p> Регион: {adress.adress.region}</p>
        <p> Район: {adress.adress.district}</p>
        <p> Город/Село/ПГТ: {adress.adress.city}</p>
        <p> Улица: {adress.adress.street}</p>
        <p> Номер дома: {adress.adress.house}</p>
        <p> Номер квартиры: {adress.adress.flat}</p>

        {state ? (
          <div className={s.operator_cont}>
            <p>ПИН оператора: {user.pin}</p>
            <p>
              ФИО оператора:{" "}
              {user.surname + " " + user.name + " " + user.lastname}
            </p>
            <p>дата и время: {date}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ServiceOne;
