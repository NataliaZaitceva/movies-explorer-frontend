import React from "react";
import link from "../../images/link.png";
import "./Portfolio.css"

function Portfolio() {
  return (
    <div className="main__portfolio">
      <h5 className="main__portfolio-title">Портфолио</h5>
      <ul className="main__portfolio-list">
        <li className="main__portfolio-link">
          Статичный сайт
          <img
            src={link}
            alt="перейти"
            className="main__portfolio-icon"
          />
        </li>
        <li className="main__portfolio-link">
          Адаптивный сайт
          <img
            src={link}
            alt="перейти"
            className="main__portfolio-icon"
          />
        </li>
        <li className="main__portfolio-link">
          Одностраничный сайт
          <img
            src={link}
            alt="перейти"
            className="main__portfolio-icon"
          />
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
