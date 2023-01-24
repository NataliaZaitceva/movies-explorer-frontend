import React from "react";
import "./NotFound.css"

function NotFound() {
    return (
        <section className="error-page">
            <h2 className="error-page__404">404</h2>
            <p className="error-page__notfound">Страница не найдена</p>
            <p className="error-page__backspace">Назад</p>
        </section>

    )
}

export default NotFound;