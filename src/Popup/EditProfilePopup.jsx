import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";
import  {CurrentUserContext}  from "../context/CurrentUserContext";
import { useForm } from "react-hook-form";

import "./EditProfilePopup.css"
function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const {
    register,
    formState: { errors },
    handleSubmit, reset
  } = useForm({
    mode: "onBlur",
  });

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser, props.isOpen]);

 const onSubmit = (data) => {
 
    props.onUpdateUser({
      name,
      email
    });
    reset()
  }

  return (
    <PopupWithForm
      name="#popupeditprofile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit(onSubmit)}
      button="Сохранить"
    >
      <label htmlFor="name">   </label>
        <input
               {...register("name",        
               {
                required: "Поле обязательно к заполнению",
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
              },
                 
                 )}
          name="name"
          type="text"
          id="name"
          className="popup__input popup__input-name"
          value={name ?? ""}
          minLength={2}
          maxLength={40}
          defaultValue={currentUser.name}
          placeholder="Имя"
          onChange={handleNameChange}
        />
<div >
     
     {errors?.name && (
       <span className="popup__form-error">
         {errors?.name?.message || "Error!"}
       </span>
     )}
   </div>   

   

      <label htmlFor="email">   </label>
        <input

{...register("email",        
{
    required: true,    
   type: "uniqueEmail",
    message: "Этот адрес уже используется"
   },
  
  )}
          name="email"
          type="text"
          id="email"
          className="popup__input popup__input-email"
        //  value={email ?? ""}
          defaultValue={currentUser.email}
          minLength={2}
          maxLength={200}
          placeholder="Email"
          onChange={handleEmailChange}
        />
   
      <div >
     
     {errors?.email && (
       <span className="popup__form-error">
         {errors?.email?.message || "Error!"}
       </span>
     )}
   </div>

    </PopupWithForm>
  );
}

export default EditProfilePopup;