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
import { Modal } from "../../components/modal/Modal";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.usersInfo);
  const err = useSelector((state) => state.auth.error);
  console.log(user);

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
      surname: user.surname + " " + user.name + " " + user.lastname,
      pin: user.pin === null ? "Нет данных" : user.pin,
      date_of_birth: user.date_of_birth === null ? "Нет данных" : user.birth,
      branch: user.branch === null ? "Нет данных" : user.branch,
      user_type: user.user_type === null ? "Нет данных" : user.user_type,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = {
        value: {
          old_password: values.old_password,
          new_password: values.new_password,
        },
        handleOpenSuccessModal,
      };

      if (values.new_password === values.secondPassword) {
        console.log("dsadsadas");
        dispatch(changePass(data));
        setPass(false);
        setModalActive(false)
      } else {
        setPass(true);
      }
    },
  });
  // console.log(formik.values)
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <p className={s.first_p}>Мой профиль</p>
        <Button
          text="ИЗМЕНИТЬ ПАРОЛЬ"
          margin="0 0"
          onClick={() => setModalActive(true)}
        />
      </div>

      <div className={s.cont}>
        <p>Личные данные</p>
        <Input
          valueLabel="ФИО"
          value={formik.values.surname}
          onChange={formik.handleChange}
          name="surname"
          type="text"
          readOnly
          width="600px"
        />
        <Input
          valueLabel="Пин"
          value={formik.values.pin}
          type="text"
          onChange={formik.handleChange}
          name="pin"
          readOnly
          width="600px"
        />
        <Input
          valueLabel="Дата рождения"
          value={formik.values.date_of_birth}
          onChange={formik.handleChange}
          width="600px"
          readOnly
          name="date_of_birth"
        />
        <Input
          valueLabel="Филиал"
          value={formik.values.branch}
          onChange={formik.handleChange}
          width="600px"
          name="branch"
          readOnly
        />
        <Input
          valueLabel="Роль"
          value={formik.values.user_type}
          onChange={formik.handleChange}
          width="600px"
          name="user_type"
          readOnly
        />
        <div className="relative">
          {/* <img src={eye===true?open_eye:close_eye} onClick={foggle} className="pass"/> */}
        </div>

        <Modal active={modalActive} setActive={setModalActive}>
          <form onSubmit={formik.handleSubmit}>
            <div className={s.cont_modal}>
              <Input
                valueLabel="Старый пароль"
                placeholder="Введите старый пароль"
                value={formik.values.old_password}
                onChange={formik.handleChange}
                // width="600px"
                name="old_password"
                marginLabel="30px 0 5px 22px"
              />
              {err && (
                <p style={{ color: "red", margin: "0 0" }}>
                  Вы ввели неправильный действующий пароль
                </p>
              )}
              <Input
                valueLabel="Новый пароль"
                placeholder="Введите новый пароль"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                // width="600px"
                name="new_password"
              />
              <Input
                placeholder="Подтвердите новый пароль"
                valueLabel="Подтвердите новый пароль"
                value={formik.values.secondPassword}
                onChange={formik.handleChange}
                // width="600px"
                name="secondPassword"
              />
              {pass && (
                <p style={{ color: "red", margin: "0 0" }}>
                  Пароли не совпадают...
                </p>
              )}
              <Button
                margin="106px 0 0"
                // width="600px"
                text="СОХРАНИТЬ"
                type="submit"
              />
            </div>
          </form>
        </Modal>
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
