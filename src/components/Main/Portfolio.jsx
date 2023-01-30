import React from "react";
import { Link } from "react-router-dom";
import link from "../../images/link.svg";
import "./Portfolio.css";

function Portfolio() {
  return (
    <div className="main-portfolio">
      <h5 className="main-portfolio-title">Портфолио</h5>
      <ul className="main-portfolio-list">
        <li className="main-portfolio-link">
        
          <a     className="main__link"
            href="https://github.com/NataliaZaitceva/how-to-learn" target="_blank"
          >
            Статичный сайт
          
          <img src={link} alt="перейти" className="main-portfolio-icon" target="_blank"/>
          </a>
        </li>
        <li className="main-portfolio-link">
       
          <a
            className="main__link"
            href="https://nataliazaitceva.github.io/russian-travel/index.html"
          >
            Адаптивный сайт
      
          <img src={link} alt="перейти" className="main-portfolio-icon" target="_blank" />
              </a>
        </li>
        <li className="main-portfolio-link">
          <a
            className="main__link"
            href="https://github.com/NataliaZaitceva/react-mesto-api-full" target="_blank"
          >
            Одностраничное приложение
  
          <img src={link} alt="перейти" className="main-portfolio-icon" target="_blank" />
                 </a> 
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
