import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  return (
    <div className={`navigation ${props.isOpen ? "navigation__active" : ""}`}>
      <nav
        className={`navigation__list ${
          props.isOpen ? "navigation__list-burger" : ""
        }`}
      >
        <Link className="navigation__link-main" to="/" target="_blank">Главная</Link>
        <Link className="navigation__link-movies" to="/movies" target="_blank">
          {" "}
          Фильмы
        </Link>

        <Link className="navigation__link-movies-saved" to="/saved-movies" target="_blank">
          Сохранённые фильмы
        </Link>

            <Link className="navigation__profile" to="/profile" target="_blank">
  Аккаунт <div className="navigation__profile-img" />
              </Link>
         
      </nav>
      <button
        className={`navigation__toggle ${
          props.isOpen ? "navigation__toggle-active" : ""
        }`}
        type="button"
        onClick={props.onClick}
      >
        <span className="navigation__toggle-item">Menu</span>
      </button>
    </div>
  );
}

export default Navigation;
