import React from "react";
import MoviesCard from "./MoviesCard";
import "./MoviesCardList.css";
import MoreButton from "./MoreButton";
import Preloader from "./Preloader";
import { useState, useEffect } from "react";


function MoviesCardList({
  movies,
  isLoading,
  handleCardSaved,
  handleCardDelete,
  savedMovies,
  isNotFound,

}) {


  const [shownFilms, setShownFilms] = useState([]);


  
  function shownFilmsByRequest() {
    if (window.innerWidth > 1200) {
      setShownFilms(12);
    } else if (window.innerWidth < 1200) {
      setShownFilms(8);
    } else if (window.innerWidth < 769) {
      setShownFilms(8);
    } else if (window.innerWidth < 500) {
      setShownFilms(5);
    }
  }

  React.useEffect(() => {
    shownFilmsByRequest();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", shownFilmsByRequest);
    }, 768);
  });

  function shownMoreFilms() {
    if (window.innerWidth > 1180) {
      setShownFilms(shownFilms + 3);
    } else if (window.innerWidth > 1023) {
      setShownFilms(shownFilms + 3);
    } else if (window.innerWidth < 1023) {
      setShownFilms(shownFilms + 2);
    }
  }


  function getUsersMovies(movie, savedMovies) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
  }

  return (
    <>
      {isLoading && <Preloader />}

{!isLoading && isNotFound && <div className="cards-list__notice">Ничего не найдено</div>}
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
                {movies.slice(0, shownFilms).map((movie) => (
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
                {movies.length > shownFilms ? (
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
