import React from "react";
import { Route, Routes } from "react-router-dom";
import "./Footer.css";
function Footer() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <header className="footer">
            <p className="footer__title">
              Учебный проект Яндекс.Практикум x BeatFilm
            </p>

            <div className="footer__links">
              <a
                href="https://practicum.yandex.ru/"
                className="footer__link"
                target="_blank"
              >
                Яндекс.Практикум
              </a>
              <a
                href="https://github.com/"
                className="footer__link"
                target="_blank"
              >
                Github
              </a>
              <p className="footer__copyright">© {new Date().getFullYear()}</p>
            </div>
          </header>
        }
      />
      <Route
        path="/movies"
        element={
          <header className="footer">
            <p className="footer__title">
              Учебный проект Яндекс.Практикум x BeatFilm
            </p>

            <div className="footer__links">
              <a
                href="https://practicum.yandex.ru/"
                className="footer__link"
                target="_blank"
              >
                Яндекс.Практикум
              </a>
              <a
                href="https://github.com/"
                className="footer__link"
                target="_blank"
              >
                Github
              </a>
              <p className="footer__copyright">© {new Date().getFullYear()}</p>
            </div>
          </header>
        }
      />
      <Route
        path="/saved-movies"
        element={
          <header className="footer">
            <p className="footer__title">
              Учебный проект Яндекс.Практикум x BeatFilm
            </p>

            <div className="footer__links">
              <a
                href="https://practicum.yandex.ru/"
                className="footer__link"
                target="_blank"
              >
                Яндекс.Практикум
              </a>
              <a
                href="https://github.com/"
                className="footer__link"
                target="_blank"
              >
                Github
              </a>
              <p className="footer__copyright">© {new Date().getFullYear()}</p>
            </div>
          </header>
        }
      />
    </Routes>
  );
}

export default Footer;
