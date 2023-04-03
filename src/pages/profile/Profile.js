import React, { useEffect, useState } from "react";
import { getUsers } from "../../redux/slices/getUsers";
import Button from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import s from "./Profile.module.scss";
import { useFormik } from "formik";
import Input from "../../components/input/Input";
// import { editUser, getUserForProfilePage } from "../../redux/slices/userSlice";
import SuccessModal from "../../components/modals/SuccessModal";
import { changePass } from "../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.usersInfo);
  const err = useSelector((state) => state.auth.error);
  console.log(err);
  
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    // console.log(id)
    dispatch(getUsers(id));
  }, []);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const handleOpenSuccessModal = () => setOpenSuccessModal(true);
  const handleCloseSuccessModal = () => setOpenSuccessModal(false);

  const [pass, setPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      secondPassword: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {

      const data = { value:{old_password:values.old_password, new_password:values.new_password}, handleOpenSuccessModal };
      
      if (values.new_password === values.secondPassword) {

        dispatch(changePass(data))
        setPass(false);

      } else {
        setPass(true);
      }
      // dispatch(editUser(data))
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const [state, setState] = useState(false);

  const toggle = () => {
    setState(!state);
  };

  const [eye, setEye] = useState(false);

  const foggle = () => {
    setEye(!eye);
  };
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <p className={s.first_p}>Мой профиль</p>
        {state === false ? (
          <Button text="ИЗМЕНИТЬ ПАРОЛЬ" margin="0 0" onClick={toggle} />
        ) : (
          <></>
        )}
      </div>

      <div className={s.cont}>
        <p>Личные данные</p>
        <form onSubmit={formik.handleSubmit}>
          <Input
            valueLabel="ФИО"
            value={user.surname + " " + user.name + " " + user.lastname}
            // onChange={formik.handleChange}
            name="allName"
            type="text"
            readOnly
            width="600px"
          />
          <Input
            valueLabel="Пин"
            value={user.pin === null ? "Нет данных" : user.pin}
            type="text"
            // onChange={formik.handleChange}
            name="pin"
            readOnly
            width="600px"
          />
          <Input
            valueLabel="Дата рождения"
            value={user.date_of_birth === null ? "Нет данных" : user.birth}
            // onChange={formik.handleChange}
            width="600px"
            readOnly
            name="birth"
          />
          <Input
            valueLabel="Филиал"
            value={user.branch === null ? "Нет данных" : user.branch}
            // onChange={formik.handleChange}
            width="600px"
            name="branch"
            readOnly
          />
          <Input
            valueLabel="Роль"
            value={user.user_type === null ? "Нет данных" : user.user_type}
            // onChange={formik.handleChange}
            width="600px"
            name="user_type"
            readOnly
          />
          <div className="relative">
            {/* <img src={eye===true?open_eye:close_eye} onClick={foggle} className="pass"/> */}
          </div>
          {state && (
            <>
              <Input
                valueLabel="Старый пароль"
                placeholder="Введите старый пароль"
                value={formik.values.old_password}
                onChange={formik.handleChange}
                width="600px"
                name="old_password"
                marginLabel="30px 0 5px 22px"
              />
              {err&&<p style={{ color: "red", margin:"0 0" }} >Вы ввели неправильный действующий пароль</p>}
              <Input
                valueLabel="Новый пароль"
                placeholder="Введите новый пароль"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                width="600px"
                name="new_password"
              />
              <Input
                placeholder="Подтвердите новый пароль"
                valueLabel="Подтвердите новый пароль"
                value={formik.values.secondPassword}
                onChange={formik.handleChange}
                width="600px"
                name="secondPassword"
              />
              {pass && <p style={{ color: "red", margin:"0 0" }}>Пароли не совпадают...</p>}
              <Button
                margin="106px 0 0"
                width="600px"
                text="СОХРАНИТЬ"
                type="submit"
              />
            </>
          )}
        </form>
      </div>
      {openSuccessModal && (
        <SuccessModal
          open={openSuccessModal}
          handleClose={handleCloseSuccessModal}
          title="Вы успешно отредактировали личные данные!"
        />
      )}
    </div>
  );
};

export default Profile;
