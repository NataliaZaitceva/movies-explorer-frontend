import React from "react";
import MoviesCard from "./MoviesCard";
import "./MoviesCardList.css";
import MoreButton from "./MoreButton";
import Preloader from "./Preloader";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import fail from "../../images/fail.svg";
import { useState, useEffect } from "react";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function MoviesCardList({
  cards,
  movies,
  isLoading,
  isSavedFilm,
  handleCardSaved,
  handleCardDelete,
  savedMovies,
  setIsNotFound,
  isNotFound,

}) {


  const [shownMovies, setShownMovies] = useState([]);

  function shownFilmsByRequest() {
    if (window.innerWidth > 1180) {
      setShownMovies(12);
    } else if (window.innerWidth > 1023) {
      setShownMovies(2);
    } else if (window.innerWidth > 800) {
      setShownMovies(8);
    } else if (window.innerWidth < 800) {
      setShownMovies(5);
    }
  }

  React.useEffect(() => {
    shownFilmsByRequest();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", shownFilmsByRequest);
    }, 500);
  });

  function shownMoreFilms() {
    if (window.innerWidth > 1180) {
      setShownMovies(shownMovies + 4);
    } else if (window.innerWidth > 1023) {
      setShownMovies(shownMovies + 3);
    } else if (window.innerWidth < 1023) {
      setShownMovies(shownMovies + 2);
    }
  }


  function getUsersMovies(movie, savedMovies) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
  }

  return (
    <>
      {isLoading && <Preloader />}

{!isLoading && isNotFound && <div>Ничего не найдено</div>}
      {!isLoading && !isNotFound && (
        <>
          {window.location.pathname === "/saved-movies" ? (
            <>
              <ul className="cards-list">
                {movies.map((movie) => (
                  <MoviesCard
                    key={movie.id || movie._id}
                    movie={movie}
                    movies={movies}
                    handleCardSaved={handleCardSaved}
                    savedMovies={savedMovies}
                    saved={getUsersMovies(movie, savedMovies)}
                    handleCardDelete={handleCardDelete}
                  />
                ))}
              </ul>
            </>
          ) : (
            <>
              <ul className="cards-list">
                {movies.slice(0, shownMovies).map((movie) => (
                  <MoviesCard
                    key={movie.id || movie._id}
                    movie={movie}
                    movies={movies}
                    handleCardSaved={handleCardSaved}
                    savedMovies={savedMovies}
                    handleCardDelete={handleCardDelete}
                    saved={getUsersMovies(movie, savedMovies)}
                  />
                ))}
              </ul>
              <>
                {movies.length > shownMovies ? (
                  <MoreButton onClick={shownMoreFilms} />
                ) : (
                  ""
                )}
              </>
            </>
          )}
        </>
      )}
    </>
  );
}

export default MoviesCardList;
