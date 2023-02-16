import React from "react";
import "./MoviesCard.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function MoviesCard({ card, movies, movie, newMovie,   isSavedFilm, saved, savedMovies, handleCardSaved, handleCardDelete }) {

// const currentUser = React.useContext(CurrentUserContext) 
 const [isSavedCard, setIsSavedCard ] = React.useState(false)
 
  
 function onClick() {
  
     handleCardSaved(movie)
     setIsSavedCard(true)
} 

  function deleteCard() {

   handleCardDelete(movie) 
   setIsSavedCard(false)
}
     

  const cardSaveButton = `${
   saved ? "card__button-active" : "card__button"
  }`;



  return (
    <li className="card" key={movie.id}>
      <div className="card__header">
        <h3 className="card__header-title">{movie.nameRU}</h3>
        <span className="card__header-time">{movie.duration} минут</span>
        
      </div>
      
      <a href={movie.trailerLink} target="_blank" rel="noreferrer" className="card__link">
      <img className="card__image" src={window.location.pathname === "/saved-movies" ? movie.image : `https://api.nomoreparties.co/${movie.image.url}`} alt={movie.title} />


      </a>

    
      {window.location.pathname === "/saved-movies" ? (
        <button className="card__button-delete" type="button" onClick={deleteCard}/>
      ) : (
        <button className={cardSaveButton} type="button" onClick={onClick}/>
      )
         
      }
     
    </li>
  );
}

export default MoviesCard;
