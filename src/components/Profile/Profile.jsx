import React from "react";
import "./Profile.css";
import {CurrentUserContext} from "../../context/CurrentUserContext";


  function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);


    
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}</h2>
      <div className="profile__form" >
        <div  className="profile__input">
     
        <p className="profile__form-name"> Имя  </p>

          <p className="profile__form-input">{currentUser.name}</p>
        </div>

        <div className="profile__input">   
        <p className="profile__form-name"> Email  </p>

<p className="profile__form-input">{currentUser.email}</p>
 
        
        </div>
         </div>
        <button type="submit" className="profile__edit" onClick={props.onEditProfile}>
          Редактировать
        </button>
        <button className="profile__button" onClick={props.onClick}>
          Выйти из аккаунта
        </button>
     
    </section>
  );
}

export default Profile;
