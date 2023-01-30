import React from "react";
import "./Techs.css";
function Techs() {
  return (
    <section className="main-techs">
      <div className="main-techs__header">
        <h2 className="main-techs__header-subtitle">Технологии</h2>
      </div>
      <h3 className="main-techs__title">7 технологий</h3>
      <p className="main-techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте
      </p>
      <ul className="main-techs__list">
        <li className="main-techs__item">HTML</li>
        <li className="main-techs__item">CSS</li>
        <li className="main-techs__item">JS</li>
        <li className="main-techs__item">React</li>
        <li className="main-techs__item">Git</li>
        <li className="main-techs__item">Express.js</li>
        <li className="main-techs__item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
