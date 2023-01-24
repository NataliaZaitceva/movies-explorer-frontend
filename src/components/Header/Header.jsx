import React, { useState } from "react";
import logo from "../../images/logo.svg";
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import "./Header.css";



function Header(props) {
  
const history = useNavigate();

  const [isMenuBurgerOpen, setIsMenuBurgerOpen] =
  React.useState(false);

  function handleMenuBurger() {
    setIsMenuBurgerOpen(!isMenuBurgerOpen);
  }

  function openMain() {
    history('/')
  }

  return (
         
      <Routes>
        <Route
        path="/"
          element={
       <>
           <header className="header__main_background">
         
            <img className="header__logo" src={logo} alt="Лого"  />
      
       <div className="header__links">
              <Link to="/signup" className="header__registraton">
                Регистрация
              </Link>
              <button className="header__button"><Link to="/signin" className="header__login">
                Войти
              </Link></button>
              </div>
       

            </header>
    </>
          }
        />

        <Route
          path="/movies"
          element={
            <header className="header">
    
            <img className="header__logo" src={logo} alt="Лого" onClick={openMain}/>
    
        <Navigation  isOpen={isMenuBurgerOpen} onClick={handleMenuBurger}> 
  
        </Navigation>
         
        </header>
          }
        />

<Route
          path="/saved-movies"
          element={
            <header className="header">
            <img className="header__logo" src={logo} alt="Лого" onClick={openMain} />
    
        <Navigation />
       
        </header>
          }
        />

<Route
          path="/profile"
          element={
            <header className="header">
            <img className="header__logo" src={logo} alt="Лого" onClick={openMain}/>
    
        <Navigation />
        </header>
          }
        />

      </Routes>
  );
}

export default Header;