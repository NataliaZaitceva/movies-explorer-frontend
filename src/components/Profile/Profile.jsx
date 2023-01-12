import React from "react";
import "./Profile.css"
import Header from "../Header/Header";

function Profile() {
    return (
<section className="profile">
    <Header />
    <h2 className="profile__title">Привет, Виталий!</h2>
    <form className="profile__form">
        <div className="profile__form__input">
        <h3 className="profile__form__name">Имя</h3>
        <p className="profile__form__value">Виталий</p>
        </div>
        <div className="profile__form__input">
        <h3 className="profile__form__name">E-mail</h3>
        <p className="profile__form__value">pochta@yandex.ru</p>
    </div>
    
    <p className="profile__edit">Редактировать</p>
    <p className="profile__edit">Выйти из аккаунта</p>
    </form>
    
</section>
    )
}

export default Profile;