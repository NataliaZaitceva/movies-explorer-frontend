import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import "./EditProfilePopup.css";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [disableSave, setDisableSave] = useState(true);

  const submitButton = useRef(null);

  const {
    register,
    formState: { errors, values, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
  });

  const newName = register("name", { required: "Обязательное поле" });
  const newEmail = register("email", { required: "Обязательное поле" });

  const handleNameChange = (e) => {
    if (e.target.value === currentUser.name) {
      setDisableSave(true);
      reset();
    } else {
      setName(e.target.value);
      setDisableSave(false);
      reset();
    }
  };


  const handleEmailChange = (e) => {
    if (e.target.value !== currentUser.email) {
      setEmail(e.target.value);

      setDisableSave(false);
      reset();
    } else {
      setDisableSave(false);
      reset();
    }
  };

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser, props.isOpen]);

  function onSubmit(e, input) {
    if (input === currentUser) {
      setDisableSave(true);
    }

    if (input !== currentUser) {
      props.onUpdateUser({
        name,
        email,
      });

      setDisableSave(true);
    } else {
      setDisableSave(true);
    }
  }

  return (
    <PopupWithForm
      name="#popupeditprofile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit(onSubmit)}
      action="submit"
    >
      <label htmlFor="name"> </label>
      <input
        {...register("name", {
          pattern: {
            value: /^[a-zA-Zа-яА-Я\s]+$/,
            message: "Имя пользователя может содержать только буквы",
          },
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
          maxLength: {
            value: 30,
            message: "Минимум 30 символов",
          },
        })}
        className="popup__input popup__input-name"
        value={name || ""}
        placeholder="Имя"
        type="text"
        {...newName}
        onChange={(e) => {
          newName.onChange(e);
          handleNameChange(e);
        }}
        onBlur={newName.onBlur}
        ref={newName.ref}
      />
      <div>
        {errors?.name && (
          <span className="popup__form-error">
            {errors?.name?.message || "Error!"}
          </span>
        )}
      </div>

      <label htmlFor="email"> </label>
      <input
        {...register("email", {
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Неверный формат электронной почты",
          },
        })}
        className="popup__input popup__input-email"
        value={email || ""}
        type="text"
        {...newEmail}
        onChange={(e) => {
          newEmail.onChange(e);
          handleEmailChange(e);
        }}
        onBlur={newEmail.onBlur}
        ref={newEmail.ref}
      />

      <div>
        {errors?.email && (
          <span className="popup__form-error">
            {errors?.email?.message || "Error!"}
          </span>
        )}
        <button
          ref={submitButton}
          className={
            isValid && !disableSave ? "popup__button" : "popup__button_disabled"
          }
          disabled={!isValid || disableSave}
        >
          Сохранить
        </button>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
