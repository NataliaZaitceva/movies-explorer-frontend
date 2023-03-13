import React from "react";
import "./MoviesCard.css";

function MoviesCard({
  card,
  movies,
  movie,
  newMovie,
  isSavedFilm,
  saved,
  savedMovies,
  handleCardSaved,
  handleCardDelete,
}) {
  function onClick() {
    if (!saved) {
      handleCardSaved(movie);
    } else {
      handleCardDelete(savedMovies.filter((m) => m.movieId === movie.id)[0]);
    }
  }

  function deleteCard() {
    handleCardDelete(movie);
  }

  const cardSaveButton = `${saved ? "card__button-active" : "card__button"}`;

  return (
    <li className="card">
      <div className="card__header" key={movie.header}>
        <h3 className="card__header-title" key={movie.nameRU}>
          {movie.nameRU}
        </h3>
        <span className="card__header-time" key={movie.duration}>
          {movie.duration} минут
        </span>
      </div>

      <a
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
        className="card__link"
        key={movie.link}
      >
        <img
          key={movie.image}
          className="card__image"
          src={
            window.location.pathname === "/saved-movies"
              ? movie.image
              : `https://api.nomoreparties.co/${movie.image.url}`
          }
          alt={movie.title}
        />
      </a>

      {window.location.pathname === "/saved-movies" ? (
        <button
          key={movie.delete}
          className="card__button-delete"
          type="button"
          onClick={deleteCard}
        />
      ) : (
        <button
          key={movie.button}
          className={cardSaveButton}
          type="button"
          onClick={onClick}
        />
      )}
    </li>
  );
}

export default MoviesCard;
