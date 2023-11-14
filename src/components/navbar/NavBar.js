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
          <NavLink to="/" className={s.exit} onClick={removeRole}>
            Выйти
          </NavLink> 
         
        </div>
    </>
  );
};
