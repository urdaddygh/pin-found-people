import React, { useEffect, useRef, useState } from "react";
import s from "./ServiceTwo.module.scss";
import { useFormik } from "formik";
import Input from "../../components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button/Button";
import { postGetFamily } from "../../redux/slices/citizenInfo";
import { useReactToPrint } from "react-to-print";
import { getUsers } from "../../redux/slices/getUsers";
import moment from "moment";

const ServiceTwo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    // console.log(id)
    dispatch(getUsers(id));
  }, []);


  const family = useSelector((state) => state.sitizen.family);
  const user = useSelector((state) => state.users.usersInfo);
  const date = moment().format('MMMM Do YYYY, h:mm:ss a');

  const [state, setState] = useState(false);

  // console.log(family);

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

  const handleClick =()=>{
    setState(true)
    setTimeout(() => handlePrint(), 10);
    // handlePrint()
  }

  return (
    <>
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
      <Button  text="Распечатать" onClick={handleClick} />
      </div>
      
    </div>

    <div ref={compRef} className={s.cont_print}>
      {family === null ? (
        <p className={s.pin} style={{color:"red"}}>Гражданин не найден</p>
      ) : (
        <>
        <p className={s.pin}>Введённый ПИН: {formik.values.pin}</p>
        {family.map((el, index) => (
          <div className={s.info_cont} key={index}>
            <p>ФИО: {el.name}</p>
            <p>ПИН: {el.pin}</p>
            <p>Роль: {el.role}</p>
          </div>
        ))}
        </>
      )}

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

export default ServiceTwo;
