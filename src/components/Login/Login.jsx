import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import "./Login.css";
function Login() {
  return (
    <section className="login">
      <div className="login__header">
        <img className="login__header-logo" src={logo} alt="лого"></img>
        <h2 className="login__header-title">Рады видеть!</h2>
      </div>
      <form className="login__form">
        <span className="login__form-name">Почта</span>
        <input className="login__input" value="email" required></input>
        <span className="login__form-name">Пароль</span>
        <input className="login__input" value="password" required></input>
        <span className="login__form-error">Пароль</span>
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
      <p className="login__text">
        Еще не зарегистрированы?{" "}
        <Link className="login__link" to="/signup" target="_blank">
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;
