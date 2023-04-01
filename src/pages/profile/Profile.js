import React, { useEffect, useState } from 'react'
import { getUsers } from '../../redux/slices/getUsers'
import Button from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import s from "./Profile.module.scss";
import { useFormik } from "formik";
import Input from "../../components/input/Input";
// import { editUser, getUserForProfilePage } from "../../redux/slices/userSlice";
import SuccessModal from "../../components/modals/SuccessModal";


const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.users.usersInfo)
  console.log(user);

  useEffect(()=>{
    const id = localStorage.getItem('user_id')
    // console.log(id)
    dispatch(getUsers(id))
  },[])

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const handleOpenSuccessModal = () => setOpenSuccessModal(true);
  const handleCloseSuccessModal = () => setOpenSuccessModal(false);

  const [pass, setPass] = useState({})
  const onChange = (value)=>{
    setPass({password:value})
  }
  const formik = useFormik({
    initialValues: {
      pin:user.pin,
      allName:user.surname + ' ' +user.name + ' ' +user.lastname,
      birth:user.date_of_birth,
      user_type:user.user_type,
      branch:user.branch
  },
  enableReinitialize:true,
    onSubmit: (values) => {
      const data = {values, handleOpenSuccessModal}
      // dispatch(editUser(data))
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const [state, setState] = useState(false)

  const toggle = ()=>{
    setState(!state)
  }

  const [eye, setEye] = useState(false)

  const foggle = () =>{
    setEye(!eye)
  } 
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <p className={s.first_p}>Мой профиль</p>
        {state === false ? (
          <Button text="ИЗМЕНИТЬ ДАННЫЕ" margin="0 0" onClick={toggle} />
        ) : (
          <></>
        )}
      </div>

      <div className={s.cont}>
        <p>Личные данные</p>
        <form onSubmit={formik.handleSubmit}>
          <Input
            valueLabel="ФИО"
            value={formik.values.allName === null? "Нет данных":formik.values.allName}
            onChange={formik.handleChange}
            name="allName"
            type="text"
            width="600px"
          />
          <Input
            valueLabel="Пин"
            value={formik.values.pin === null? "Нет данных":formik.values.pin}
            type="text"
            onChange={formik.handleChange}
            name="pin"
            width="600px"
          />
          <Input
            valueLabel="Дата рождения"
            value={formik.values.birth === null? "Нет данных":formik.values.birth}
            onChange={formik.handleChange}
            width="600px"
            name="birth"
          />
          <Input
            valueLabel="Филиал"
            value={formik.values.branch === null? "Нет данных":formik.values.branch}
            onChange={formik.handleChange}
            width="600px"
            name="branch"
          />
          <Input
            valueLabel="Роль"
            value={formik.values.user_type === null? "Нет данных":formik.values.user_type}
            onChange={formik.handleChange}
            width="600px"
            name="user_type"
          />
          <div className="relative">
          {/* <img src={eye===true?open_eye:close_eye} onClick={foggle} className="pass"/> */}
          
          </div>
          {state === true ? (
            <Button
              margin="106px 0 0"
              width="600px"
              text="СОХРАНИТЬ"
              type="submit"
            />
          ) : (
            <></>
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
}

export default Profile