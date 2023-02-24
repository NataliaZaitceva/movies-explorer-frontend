import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import "./Movies.css";

import { filterDuration, filterMovies } from "../../utils/constants";


function Movies({ handleCardSaved, getFilms, savedMovies, handleCardDelete }) {
  const [initialMovies, setInitialMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isFilteredMovies, setIsFilteredMovies] = useState([]);

  const [isShortMovies, setIsShortMovies] = useState(false);

  const [isRequestError, setIsRequestError] = useState(false); //ошибка запроса к серверу
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены



  function handleFilter(movies, request, shortMovie) { 
    const moviesList = filterMovies(movies, request, shortMovie);
    setInitialMovies(moviesList);
    console.log(moviesList.length);
    setIsFilteredMovies(shortMovie ? filterDuration(moviesList) : moviesList);
    localStorage.setItem("movies", JSON.stringify(moviesList));
    localStorage.setItem("allFindedMovies", JSON.stringify(movies));
  }




  function onSearchMovies(request) {

    console.log('отправляем запрос')
    console.log(request)
    localStorage.setItem("movieSearch", request);
    localStorage.setItem("shortMovies", isShortMovies);
    if (localStorage.getItem("allFindedMovies")) {
      const movies = JSON.parse(localStorage.getItem("allFindedMovies"));
   
      handleFilter(movies, request, isShortMovies);
 getFilms()
    } else {

  }
  }

  useEffect(() => {
    if (localStorage.getItem('movieSearch')) {
      if (isFilteredMovies.length === 0) {
        setIsNotFound(true);
        console.log('nothing')
      } else {
        setIsNotFound(false);
      }
    } else {
      setIsNotFound(false);
    }
  }, [isFilteredMovies]);

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);

    if (!isShortMovies) {
      if (filterDuration(initialMovies).length === 0) {
        setIsFilteredMovies(filterDuration(initialMovies));
      
      } else {
        setIsFilteredMovies(filterDuration(initialMovies));
      }
    } else {
      setIsFilteredMovies(initialMovies);
    }
    localStorage.setItem("shortMovies", !isShortMovies);
  }

   

  useEffect(() => {
    if (localStorage.getItem("movies") ) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialMovies(movies);
      console.log("movies");
      if (localStorage.getItem("shortMovies") === "true") {
        setIsFilteredMovies(filterDuration(movies));
      } else {
        setIsFilteredMovies(movies);
      } 
    }
    else {
  
    }
  }, []);

  
 useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, []);






  return (
    <main className="movies">
      <SearchForm
        onSearchMovies={onSearchMovies}
        onFilter={handleShortMovies}
        isShortMovies={isShortMovies}

    savedMovies={savedMovies}
      />
      <div className="movies-cards">
        <MoviesCardList
 // movie={movie}
   movies={isFilteredMovies}
   setIsNotFound={setIsNotFound}
   isNotFound={isNotFound}
   isRequestError={isRequestError}
   setIsRequestErr={setIsRequestError}

          handleCardSaved={handleCardSaved}
          savedMovies={savedMovies}
          isLoading={isLoading}
          handleCardDelete={handleCardDelete}
        />
      </div>
    </main>
  );
}

export default Movies;
