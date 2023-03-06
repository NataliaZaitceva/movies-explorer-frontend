import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";
import  {CurrentUserContext}  from "../context/CurrentUserContext";
import { useForm } from "react-hook-form";

import "./EditProfilePopup.css"
function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit, 
  } = useForm({
    mode: "onChange",
  });

  const newName = register('name', {required:'Обязательное поле'}) 
  const newEmail = register('email', {required: 'Обязательное поле'}) 


  function handleNameChange(e) {

  setName(e.target.value)

} 
     

  function handleEmailChange(e) {
      setEmail(e.target.value);
  }

  useEffect(() => {
   
   setName(currentUser.name);
    setEmail(currentUser.email);  

  }, [currentUser, props.isOpen]);


 const onSubmit = (e) => {

  props.onUpdateUser({
      name,
      email
    });
   }
 



  return (
    <PopupWithForm
      name="#popupeditprofile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit(onSubmit)}

    >
      <label htmlFor="name">   </label>
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
              
               } )}
          name="name" 
             id="name"
          className="popup__input popup__input-name"
         value={name ?? ""}
          defaultValue={currentUser.name}   
           placeholder="Имя"
           type="name"
           {...newName}
           onChange={(e) => {
            newName.onChange(e);
             handleNameChange(e);
        }}
        onBlur={newName.onBlur}
        ref={newName.ref}
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
   pattern: {
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
          message: "Неверный формат электронной почты"},}
  
  )}
          name="email"
          type="uniqueEmail"
          id="email"
          className="popup__input popup__input-email"
    //  value={email ?? ""}
          defaultValue={currentUser.email}
          {...newEmail}
          onChange={(e) => {
            newEmail.onChange(e);
            handleEmailChange(e);
       }}
       onBlur={newEmail.onBlur}
       ref={newEmail.ref}
        />
   
      <div >
     
     {errors?.email && (
       <span className="popup__form-error">
         {errors?.email?.message || "Error!"}
       </span>
     )}
     <button className={isValid ? "popup__button" : "popup__button-disabled"}>Сохранить</button>
   </div>

    </PopupWithForm>
  );
}

export default EditProfilePopup;