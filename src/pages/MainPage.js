import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { NavBar } from '../components/navbar/NavBar';
import Auth from './auth/Auth';
import s from './MainPage.module.scss'
import Profile from './profile/Profile';

const MainPage = () => {
  return (
    <div className={s.container}>
      <div className={s.navbar}>
        <NavBar />
      </div>
    <div className={s.content}>
      <Routes>
        <Route path='/profile/*' element={<Profile />} />
      </Routes>
    </div>
    </div>
  );
}

export default MainPage;