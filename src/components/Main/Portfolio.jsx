import React from "react";
import { Link } from "react-router-dom";
import link from "../../images/link.png";
import "./Portfolio.css";

function Portfolio() {
  return (
    <div className="main__portfolio">
      <h5 className="main__portfolio-title">Портфолио</h5>
      <ul className="main__portfolio-list">
        <li className="main__portfolio-link">
          {" "}
          <Link
            className="main__link"
            to="https://github.com/NataliaZaitceva/how-to-learn"
          >
            Статичный сайт
          </Link>{" "}
          <img src={link} alt="перейти" className="main__portfolio-icon" />
        </li>
        <li className="main__portfolio-link">
          {" "}
          <Link
            className="main__link"
            to="https://nataliazaitceva.github.io/russian-travel/index.html"
          >
            Адаптивный сайт
          </Link>{" "}
          <img src={link} alt="перейти" className="main__portfolio-icon" />
        </li>
        <li className="main__portfolio-link">
          <Link
            className="main__link"
            to="https://github.com/NataliaZaitceva/react-mesto-api-full"
          >
            Одностраничное приложение
          </Link>
          <img src={link} alt="перейти" className="main__portfolio-icon" />
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
