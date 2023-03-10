import React, { useState } from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Login.css";
function Login({ onLogin }) {

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const {
    register,
    formState: { errors, isValid },
    handleSubmit, reset
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    onLogin({ email, password });
    reset()
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);

  }

  function openMain() {
    window.open("/",  "_self");
  
  }

  const userEmail = register('email', {required: 'Обязательное поле'}) 
  const userPassword = register('password', {required: 'Обязательное поле'}) 

  return (
    <section className="login">
      <div className="login__header">
        <img className="login__header-logo" src={logo} alt="лого" onClick={openMain}></img>
        <h2 className="login__header-title">Рады видеть!</h2>
      </div>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="login__form-name">
          Почта
        </label>
        <input
          {...register("email",        
          {
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
                    message: "Неверный формат электронной почты"},
                    })}
          className="login__input"
          value={email}
          name="email"
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
       <span className="login__form-error">
         {errors?.email?.message || "Error!"}
       </span>
     )}
   </div>   
        <label htmlFor="password" className="login__form-name">Пароль</label>
        <input
         {...register("password")}
          className="login__input"
          value={password}
          name="password"
          type="password"
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
       <span className="login__form-error">
         {errors?.password?.message || "Error!"}
       </span>
     )}
   </div>
        <button type="submit" className={isValid ? "login__button" : "login__button_disabled"}>
          Войти
        </button>
      </form>
      <p className="login__text">
        Еще не зарегистрированы?{" "}
        <Link className="login__link" to="/signup">
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;
