import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import "./Register.css";

function Register(props) {
  return (
    <section className="register">
      <div className="register__header">
        <img className="register__header-logo" src={logo} alt="лого"></img>
        <h2 className="register__header-title">Добро пожаловать!</h2>
      </div>
      <form className="register__form">
        <h3 className="register__form-name">Имя</h3>
        <input className="register__input" value="Виталий" required></input>
        <h3 className="register__form-name">Email</h3>
        <input
          className="register__input"
          value="pochta@yandex.ru"
          required
        ></input>
        <h3 className="register__form-name">Пароль</h3>
        <input
          className="register__input"
          value="password"
          required
        ></input>
        <span className="register__form-error">Что-то пошло не так...</span>

        <button type="submit" className="register__button">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?{" "}
        <Link className="register__link" to="/signin" >
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
