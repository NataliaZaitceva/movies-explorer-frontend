import React from "react";
import MoviesCard from "./MoviesCard";
import "./MoviesCardList.css";
import MoreButton from "./MoreButton";
import Preloader from "./Preloader";
import { useState, useEffect } from "react";
import { DESKTOP, TABLET, MOBILE, DESKTOP_MORE_FIlMS, TABLET_MORE_FIlMS, MOBILE_MORE_FIlMS } from "../../utils/constants";

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
    if (window.innerWidth > DESKTOP) {
      setShownFilms(12);
    } else if (window.innerWidth < DESKTOP) {
      setShownFilms(8);
    } else if (window.innerWidth < TABLET) {
      setShownFilms(8);
    } else if (window.innerWidth < MOBILE) {
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
    if (window.innerWidth === DESKTOP) {
      setShownFilms(shownFilms + DESKTOP_MORE_FIlMS);
    } else if (window.innerWidth > TABLET) {
      setShownFilms(shownFilms + TABLET_MORE_FIlMS);
    } else if (window.innerWidth < MOBILE) {
      setShownFilms(shownFilms + MOBILE_MORE_FIlMS);
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
