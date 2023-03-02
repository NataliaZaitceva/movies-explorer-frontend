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
    mode: "onBlur",
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
            required: "Поле обязательно к заполнению",
           
          },
          
          )}
          className="login__input"
          value={email}
          name="email"
          onChange={handleEmailChange}
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
         {...register("password", { required: "Поле обязательно к заполнению",
        })}
          className="login__input"
          value={password}
          name="password"
          type="password"
          onChange={handlePasswordChange}
          
        ></input>

<div >
     
     {errors?.password && (
       <span className="login__form-error">
         {errors?.password?.message || "Error!"}
       </span>
     )}
   </div>
        <button type="submit" className={isValid ? "login__button" : ".login__button_disabled"}>
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
