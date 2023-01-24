import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"
function Footer() {
    return (
      <header className="footer">
        <p className="footer__title">Учебный проект Яндекс.Практикум x BeatFilm</p>
        
     

        <div className="footer__links">
         
        <Link to="https://practicum.yandex.ru/" className="footer__link">
                Яндекс.Практикум
              </Link>
              <Link to="https://github.com/" className="footer__link">
                Github
              </Link>      
             <p className="footer__copyright">
          © {new Date().getFullYear()}</p>
        </div>


      </header>
    );
  }
  
  export default Footer;
  