import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  return (
    <div className={`navigation ${props.isOpen ? "navigation__active" : ""}`}>
      <nav
        className={`navigation__list ${
          props.isOpen ? "navigation__list__burger" : ""
        }`}
      >
        <Link className="navigation__link__main">Главная</Link>
        <Link className="navigation__link__movies" to="/movies">
          {" "}
          Фильмы
        </Link>

        <Link className="navigation__link__movies-saved" to="/saved-movies">
          Сохранённые фильмы
        </Link>

        <div className="navigation__profile">
          <Link className="navigation__profile__text" to="/profile">
            Аккаунт
          </Link>
          <div className="navigation__profile__img" />
        </div>
      </nav>
      <button
        className={`navigation__toggle ${
          props.isOpen ? "navigation__toggle__active" : ""
        }`}
        type="button"
        onClick={props.onClick}
      >
        <span className="navigation__toggle__item">Menu</span>
      </button>
    </div>
  );
}

export default Navigation;
