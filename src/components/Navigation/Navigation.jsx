import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css'
function Navigation(props) {
    return (
      <section className="navigation"> 
    <ul className="navigation__list">
    <li className="navigation__link__movies">
            Фильмы </li>
    <li className="navigation__link__movies-saved">Сохранённые фильмы</li>
            </ul>
            <div className="navigation__profile">
            <p className="navigation__profile__text">Аккаунт</p>
            <div className="navigation__profile__img" />
        </div>
</section>
    )
}

export default Navigation;