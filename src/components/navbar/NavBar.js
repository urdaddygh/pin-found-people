import React from "react";
import { NavLink,useLocation } from "react-router-dom";
import s from "./NavBar.module.scss";
import {getCookie, removeCookie} from "../../utils/cookieFunction/cookieFunction";

export const NavBar = () => {

    const location = useLocation();
    const linkActiveClassName = (navLink) => {
      const currentParentPath = location.pathname.split("/")[2];
      const isParentLinkActive = currentParentPath === navLink;

      if (isParentLinkActive) return s.active_link;
      return s.unactive_link;
    };
    const removeRole=()=>{
      // localStorage.removeItem('role')
      removeCookie("access")
      removeCookie("refresh")
    }

  return (
    <>
     
        <div className={s.cont}>
          <NavLink
            to="/main/serviceOne"
            className={linkActiveClassName("serviceOne")}
          >
            <span className={s.top_curve}></span>
            Место жительство 
            <span className={s.bottom_curve}></span>
          </NavLink>
          <NavLink
            to="/main/serviceTwo"
            className={linkActiveClassName("serviceTwo")}
          >
            <span className={s.top_curve}></span>
            Семейное положение
            <span className={s.bottom_curve}></span>
          </NavLink>
          <NavLink
            to="/main/profile"
            className={linkActiveClassName("profile")}
          >
            <span className={s.top_curve}></span>
            Личный кабинет
            <span className={s.bottom_curve}></span>
          </NavLink>

           {/* <NavLink
            to="/main/protocol/all_protocols"
            className={linkActiveClassName("protocol")}
          >
            <span className={s.top_curve}></span>
            Протоколы
            <span className={s.bottom_curve}></span>
          </NavLink>
          <NavLink
            to="/main/clubs/all_clubs"
            className={linkActiveClassName("clubs")}
          >
            <span className={s.top_curve}></span>
            Клубы
            <span className={s.bottom_curve}></span>
          </NavLink>
          <NavLink
            to="/main/statistics/progress"
            className={linkActiveClassName("statistics")}
          >
            <span className={s.top_curve}></span>
            Статистика
            <span className={s.bottom_curve}></span>
          </NavLink>
          <NavLink
            to="/main/documentation/all_documentation"
            className={linkActiveClassName("documentation")}
          >
            <span className={s.top_curve}></span>
            Документация
            <span className={s.bottom_curve}></span>
          </NavLink>
          <NavLink
            to="/main/profile"
            className={linkActiveClassName("profile")}
          >
            <span className={s.top_curve}></span>
            Профиль
            <span className={s.bottom_curve}></span>
          </NavLink>
          <NavLink to="/main/chat" className={linkActiveClassName("chat")}>
            <span className={s.top_curve}></span>
            Чат
            <span className={s.bottom_curve}></span>
          </NavLink> */}

          <NavLink to="/" className={s.exit} onClick={removeRole}>
            Выйти
          </NavLink> 
         
        </div>
    </>
  );
};
