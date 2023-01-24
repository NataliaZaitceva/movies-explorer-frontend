import React from "react";
import "./MoviesCard.css"
import { CurrentUserContext } from "../../context/CurrentUserContext";


function MoviesCard({ card }) {
  
  
const cardSaveButton = `${
    card.saved ? 'card__save_button_active' : 'card__save_button'
}`;

    return(
     <li className="card">
            <div className="card__header">
                <h3 className="card__header-title">{card.title}</h3>
                <span className="card__header-time">{card.duration}</span>
            </div>
            <img className="card__image" src={card.image} alt={card.title} />
            <button className={cardSaveButton}
                type="button"
            />
        </li>

    )
}

export default MoviesCard;