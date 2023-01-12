import React from "react";
import landing__logo from "../../images/landing-logo.svg"
import "./Promo.css"
function Promo(props) {
    return (
        <section className="promo">
            <div className="promo__landing">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
            <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя</p>
            <button type="button" className="promo__button">Узнать больше</button>
            </div>

            
<img className="promo__logo" src={landing__logo} alt="лого" />

        </section>
    )
}

export default Promo;