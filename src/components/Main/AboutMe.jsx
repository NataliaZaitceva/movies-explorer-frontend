import React from "react";
import Portfolio from "./Portfolio";
import photo from "../../images/photo.png";

import "./AboutMe.css";
function AboutMe() {
  return (
    <section className="main-student">
      <div className="main-student__header">
        <h2 className="main-student__header-subtitle">Студент</h2>
      </div>
      <img src={photo} alt="фото" className="main-student__photo"></img>
      <div className="main-student__info">
        <h3 className="main-student__info-name">Виталий</h3>
        <h4 className="main-student__info-about">
          Фронтенд-разработчик, 30 лет
        </h4>
        <p className="main-student__info-description">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
          есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, начал заниматься
          фриланс-заказами и ушёл с постоянной работы.
        </p>
        <p className="main-student__info-link">Github</p>
      </div>

      <Portfolio />
    </section>
  );
}

export default AboutMe;
