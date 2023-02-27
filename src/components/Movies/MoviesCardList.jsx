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
isRequestError
}) {


  const [shownMovies, setShownMovies] = useState([]);

  function shownFilmsByRequest() {
    if (window.innerWidth === 1280) {
      setShownMovies(12);
    } else if (window.innerWidth < 1200) {
      setShownMovies(8);
    } else if (window.innerWidth < 769) {
      setShownMovies(8);
    } else if (window.innerWidth < 500) {
      setShownMovies(5);
    }
  }

  React.useEffect(() => {
    shownFilmsByRequest();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", shownFilmsByRequest);
    }, 700);
  });

  function shownMoreFilms() {
    if (window.innerWidth > 1180) {
      setShownMovies(shownMovies + 3);
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

{!isLoading && isNotFound && <div className="cards-list__notice">Ничего не найдено</div>}
{!isLoading && isRequestError && <div className="cards-list__notice">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</div>}  
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
