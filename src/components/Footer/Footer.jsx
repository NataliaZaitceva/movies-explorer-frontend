import React from "react";
import "./Footer.css"
function Footer() {
    return (
      <header className="footer">
        <p className="footer__title">Учебный проект Яндекс.Практикум x BeatFilm</p>
        <p className="footer__copyright">
          © {new Date().getFullYear()}
        </p>
      </header>
    );
  }
  
  export default Footer;
  