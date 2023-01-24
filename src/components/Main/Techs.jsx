import React from "react";
import "./Techs.css";
function Techs() {
  return (
    <section className="main__techs">
      <div className="main__techs__header">
        <h2 className="main__techs__header__subtitle">Технологии</h2>
      </div>
      <h3 className="main__techs__title">7 технологий</h3>
      <p className="main__techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте
      </p>
      <ul className="main__techs__list">
        <li className="main__techs__item">HTML</li>
        <li className="main__techs__item">CSS</li>
        <li className="main__techs__item">JS</li>
        <li className="main__techs__item">React</li>
        <li className="main__techs__item">Git</li>
        <li className="main__techs__item">Express.js</li>
        <li className="main__techs__item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
