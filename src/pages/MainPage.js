import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Auth from './auth/Auth';
import s from './MainPage.module.scss'
import Profile from './profile/Profile';

const MainPage = () => {
  return (
    <div className={s.container}>
      <Routes>
        <Route path='/*' element={<Auth />} />
        <Route path='/profile/*' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default MainPage;