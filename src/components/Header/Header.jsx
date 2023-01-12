import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import './Header.css';
function Header(props) {
    return (
    <header className="header">
        <img className="header__logo" src={logo} alt="Лого" />
     <Navigation />

        
    </header>
    )
}

export default Header;