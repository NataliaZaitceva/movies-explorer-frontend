import React, { useState } from "react";
import logo from "../../images/logo.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Register.css";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    formState: { errors, isValid },
    handleSubmit, reset
  } = useForm({
    mode: "onChange"
  });

  function handleEmailChange(e) {

       e.preventDefault()
    setEmail(e.target.value);

  }

  function handlePasswordChange(e) {
    e.preventDefault()
    setPassword(e.target.value);
  };

  const firstName = register('name', {required:'Обязательное поле'}) 
  const userEmail = register('email', {required: 'Обязательное поле'}) 
  const userPassword = register('password', {required: 'Обязательное поле'}) 
  function handleNameChange(e) {
    e.preventDefault()
    setName(e.target.value);
  }

 const onSubmit = (data) => {
    onRegister({ name, email, password });

    reset()
  }


  function openMain() {
    window.open("/",  "_self");
  
  }

  return (
    <section className="register">
      <div className="register__header">
        <img className="register__header-logo" src={logo} alt="лого" onClick={openMain}></img>
        <h2 className="register__header-title">Добро пожаловать!</h2>
      </div>
      <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="register__form-name" htmlFor="name">
          Имя
        </label>
        <input
          {...register("name", 
      {    
        pattern: {
          value: /^[a-zA-Zа-яА-Я\s]+$/,  
        message: "Имя пользователя может содержать только буквы"},
        minLength: {
          value: 2,
          message: "Минимум 2 символа"
        },
        maxLength: {
          value: 30,
          message: "Минимум 30 символов"
        },
        


      })}
          className="register__input"
          value={name}
          type="name"
          {...firstName}
          onChange={(e) => {
            firstName.onChange(e);
            handleNameChange(e);
       }}
       onBlur={firstName.onBlur}
       ref={firstName.ref}
        ></input>

        <div >
     
          {errors?.name && (
            <span className="register__form-error">
              {errors?.name?.message}
            </span>
          )}
        </div>

        <label htmlFor="email" className="register__form-name">
          Email
        </label>

        <input
          {...register("email",

{
pattern: {
  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        message: "Неверный формат электронной почты"},
        })}
          className="register__input"
          value={email}
          {...userEmail}
          onChange={(e) => {
            userEmail.onChange(e);
            handleEmailChange(e);
       }}
       onBlur={userEmail.onBlur}
       ref={userEmail.ref}
        ></input>

<div >
     
     {errors?.email && (
       <span className="register__form-error">
         {errors?.email?.message}
       </span>
     )}
   </div>

        <label htmlFor="password" className="register__form-name">
          Пароль
        </label>
        <input
          className="register__input"
          value={password}
          type="password"
          name="password"
          {...userPassword}
          onChange={(e) => {
            userPassword.onChange(e);
            handlePasswordChange(e);
       }}
       onBlur={userPassword.onBlur}
       ref={userPassword.ref}
        ></input>
       <div >
     
     {errors?.password && (
       <span className="register__form-error">
         {errors?.password?.message || "Error!"}
       </span>
     )}
   </div>

        <button type="submit" className={isValid ? "register__button" : "register__button_disabled"}>
          Зарегистрироваться
        </button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?{" "}
        <Link className="register__link" to="/signin">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
