import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import "./Movies.css";
import * as movieApi from "../../utils/MovieApi";
import { filterDuration, filterMovies } from "../../utils/constants";


function Movies({  handleCardSaved,  savedMovies, handleCardDelete }) {
  const [initialMovies, setInitialMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isFilteredMovies, setIsFilteredMovies] = useState([]);

  const [isShortMovies, setIsShortMovies] = useState(false);

  const [isReqErr, setIsRequestErr] = useState(false); //ошибка запроса к серверу
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены
const [isFilm, setIsFilm] = useState({})

 



  function handleFilter(movies, request, shortMovie) { 
    const moviesList = filterMovies(movies, request, shortMovie);
    setInitialMovies(moviesList);
    console.log(moviesList.length);

    setIsFilteredMovies(shortMovie ? filterDuration(moviesList) : moviesList);
    localStorage.setItem("movies", JSON.stringify(moviesList));
    localStorage.setItem("allMovies", JSON.stringify(movies));
  }


  function onSearchMovies(request) {

    console.log('отправляем запрос')
    console.log(request)
    localStorage.setItem("movieSearch", request);
    localStorage.setItem("shortMovies", isShortMovies);
    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      console.log("получаем ответ на запрос");
      handleFilter(movies, request, isShortMovies);
    } else {
   
      movieApi
        .getMovies()
        .then((moviesData) => {
          handleFilter(moviesData, request, isShortMovies);

 setIsFilm(moviesData);
          console.log("загрузка фильмов");
          console.log(moviesData)
        })
        .catch((err) => {
          setIsRequestErr(true);

          console.log(err);
        })
      
    }
  }


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
   
          handleCardSaved={handleCardSaved}
          savedMovies={savedMovies}
          isLoading={isLoading}
          handleCardDelete={handleCardDelete}
isSavedFilm={true}
        />
      </div>
    </main>
  );
}

export default Movies;
