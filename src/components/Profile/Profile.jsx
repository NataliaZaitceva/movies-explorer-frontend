import React from "react";
import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form">
        <div className="profile__form-input">
          <h3 className="profile__form-name">Имя</h3>
          <p className="profile__form-value">Виталий</p>
        </div>
        <div className="profile__form-input">
          <h3 className="profile__form-name">E-mail</h3>
          <p className="profile__form-value">pochta@yandex.ru</p>
        </div>

        <p className="profile__edit">Редактировать</p>
        <p className="profile__edit">Выйти из аккаунта</p>
      </form>
    </section>
  );
}

export default Profile;
