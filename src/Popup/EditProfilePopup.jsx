import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";
import  {CurrentUserContext}  from "../context/CurrentUserContext";
import "./EditProfilePopup.css"
function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  function handleSubmit(e) {
    e.preventDefault();
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
      onSubmit={handleSubmit}
      button="Сохранить"
    >
      <label htmlFor="name">
        <input
          name="name"
          type="text"
          id="name"
          className="popup__input popup__input-name"
          value={name ?? ""}
          minLength={2}
          maxLength={40}
          defaultValue={currentUser.name}
          placeholder="Имя"
          required=""
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="email">
        <input
          name="email"
          type="text"
          id="email"
          className="popup__input popup__input-email"
          value={email ?? ""}
          defaultValue={currentUser.email}
          minLength={2}
          maxLength={200}
          placeholder="Email"
          required=""
          onChange={handleEmailChange}
        />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;