import React from "react";
import pic from "../../images/pic.jpg"
import "./MoviesCard.css"

function MoviesCard(props) {

    return(
        <div className="movies__item">
            <div className="movies__item__header">
            <p className="movies__item__header-title">В погоне за Бэнкси</p>
            <p className="movies__item__header-time">27 минут</p>
            </div>
            <img className="movie__item__image" src={pic} alt="изображение" />
            <button className='movie__item__button'
            type="button"
            >Сохранить</button> 
        </div>
    )
}

export default MoviesCard;