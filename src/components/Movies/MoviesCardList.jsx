import React from "react";
import MoviesCard from "./MoviesCard";
import "./MoviesCardList.css";
import MoreButton from "./MoreButton";
import Preloader from "./Preloader"
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import fail from "../../images/fail.svg"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function MoviesCardList({cards,  movies, isLoading, isSavedFilm, handleCardSaved, handleCardDelete, savedMovies }) {
 
  const [isBadRequest, setIsBadRequest] = useState(false);
  const [isRequestEmpty, setIsRequestEmpty] = useState(false);
 
const [shownMovies, setShownMovies] = useState(0);


 /* if (movies.length > 0) {
    console.log("yes");
  } else {
    console.log("no");
  }*/



function shownCount() {
  const display = window.innerWidth;
  if (display > 1180) {
    setShownMovies(3);
  } else if (display > 1023) {
    setShownMovies(2);
  } else if (display > 800) {
    setShownMovies(8);
  } else if (display < 800) {
    setShownMovies(5);
  }
}

React.useEffect(() => {
  shownCount();
}, []);

useEffect(() => {
  setTimeout(() => {
    window.addEventListener('resize', shownCount);
  }, 500);
});

function showMore() {
  const display = window.innerWidth;
  if (display > 1180) {
    setShownMovies(shownMovies + 4);
  } else if (display > 1023) {
    setShownMovies(shownMovies + 3);
  }
  // else if (display > 800) {
  //   setShownMovies(shownMovies + 2);
  // }
  else if (display < 1023) {
    setShownMovies(shownMovies + 2);
  }
}

function getUsersMovies(movie, savedMovies) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
    
  }


  return (
      <>
        {isLoading && <Preloader />}
          
       {!isLoading && !isBadRequest && !isRequestEmpty && (
        <>
         {window.location.pathname === '/saved-movies' ? (
          <>
          <ul className="cards-list">
          {  movies.map((movie) => (
            <MoviesCard
              key={isSavedFilm ? movie._id : movie.id}
        movie={movie}
      movies={movies}
            handleCardSaved={handleCardSaved}
              isSavedFilm={isSavedFilm}
         // savedMovies={savedMovies}
   saved={getUsersMovies(movie, savedMovies)}
              handleCardDelete={handleCardDelete}
            />
          ))}
          </ul>
         </>
       
       ) : (
        <>
        <ul className="cards-list">
        { movies.slice(0, shownMovies).map((movie) => (

            <MoviesCard
              key={isSavedFilm ? movie._id : movie.id}
             movie={movie}
       movies={movies}
              handleCardSaved={handleCardSaved}
            isSavedFilm={isSavedFilm}
   savedMovies={savedMovies}
           //   savedMovies={savedMovies}
             handleCardDelete={handleCardDelete}
    saved={getUsersMovies(movie, savedMovies)}
             
            />
          ))}
      </ul>
      <>
                {movies.length > shownMovies ? (
                 <MoreButton onClick={showMore}/>
                ) : (
                  ''
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
