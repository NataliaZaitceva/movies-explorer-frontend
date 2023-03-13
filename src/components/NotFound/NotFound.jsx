import React, { useEffect } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {



  return (
    <section className="error-page">
      <h2 className="error-page__404">404</h2>
      <p className="error-page__notfound">Страница не найдена</p>
      <Link className="error-page__backspace" to={'/'}>Назад</Link>
    </section>
  );
}

export default NotFound;
