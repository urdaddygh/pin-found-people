import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { NavBar } from '../components/navbar/NavBar';
import Auth from './auth/Auth';
import s from './MainPage.module.scss'
import Profile from './profile/Profile';
import ServiceOne from './ServiceOne/ServiceOne';
import ServiceTwo from './ServiceTwo/ServiceTwo';



const MainPage = () => {
  return (
    <div className={s.container}>
      <div className={s.navbar}>
        <NavBar />
      </div>
    <div className={s.content}>
      <Routes>
        <Route path='/profile/*' element={<Profile />} />
        <Route path='/serviceOne' element={<ServiceOne />} />
        <Route path='/serviceTwo' element={<ServiceTwo />} />
      </Routes>
    </div>
    </div>
  );
}

export default MainPage;