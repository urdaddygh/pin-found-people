import { useFormik } from "formik";
import React, { useState } from "react";
import s from "./Auth.module.scss";
import Input from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postAuth } from "../../redux/slices/authSlice";
import Button from "../../components/button/Button";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authErr = useSelector(state=>state.auth.error)

  console.log(authErr)

  const [pass, setPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      secondPassword: "",
    },

    onSubmit: (values) => {
      console.log(values);
      if (values.secondPassword === values.password) {
        let data = { values, navigate };
        dispatch(postAuth(data));
        setPass(false);
      } else {
        setPass(true);
      }
    },
  });

  return (
    <div className={s.auth_cont}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="name"
          value={formik.values.name}
          type="text"
          onChange={formik.handleChange}
          placeholder="Введите логин"
        />
        <Input
          name="password"
          value={formik.values.password}
          type="password"
          onChange={formik.handleChange}
          background={authErr===true || pass&&"red"}
          placeholder="Введите пароль"
        />
        <Input
          name="secondPassword"
          value={formik.values.secondPassword}
          type="password"
          onChange={formik.handleChange}
          placeholder="Введите пароль повторно"
          background={authErr===true || pass&&"red"}
        />
        {pass && <p className={s.wrongPass}>пароли не совпадают...</p>}
        {authErr && <p className={s.wrongPass}>Такого аккаунта нет.</p>}
        <Button
          text="ВОЙТИ"
          type="submit"
          disabled={
            !(
              formik.values.password &&
              formik.values.name &&
              formik.values.secondPassword
            )
          }
        />
      </form>
    </div>
  );
};

export default Auth;
