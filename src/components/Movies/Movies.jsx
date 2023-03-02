import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import "./Movies.css";
import * as movieApi from "../../utils/MovieApi";
import { filterDuration, filterMovies } from "../../utils/constants";

function Movies({ handleCardSaved, getFilms, savedMovies, handleCardDelete }) {
  const [initialMovies, setInitialMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isFilteredMovies, setIsFilteredMovies] = useState([]);

  const [isShortMovies, setIsShortMovies] = useState(false);

  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены

  const [isFilm, setIsFilm] = useState({});

  function handleFilter(movies, request, isShortMovies) {
    const moviesList = filterMovies(movies, request, isShortMovies);
    setInitialMovies(moviesList);
 
    console.log(moviesList.length);
    console.log(request)
    setIsFilteredMovies(
      isShortMovies ? filterDuration(moviesList) : moviesList
    );
    localStorage.setItem("movies", JSON.stringify(moviesList));
    localStorage.setItem("allFindedMovies", JSON.stringify(movies));
   // localStorage.setItem("movieSearch", JSON.stringify(request));
  }



  function onSearchMovies(request) {
    console.log("отправляем запрос");
    console.log(request);
    localStorage.setItem("movieSearch", request);
    localStorage.setItem("shortMovies", isShortMovies);
    if (localStorage.getItem("allFindedMovies")) {
      const movies = JSON.parse(localStorage.getItem("allFindedMovies"));
      handleFilter(movies,  request,  isShortMovies);
    } 
    
    else {
      setIsLoading(true)
      movieApi
        .getMovies()
        .then((cardsData) => {
          handleFilter(cardsData, request, isShortMovies);
          setIsFilm(cardsData);
          console.log("загрузка фильмов");
          console.log(cardsData);
        })
        .catch((err) => {
          setIsNotFound(true);
        
          console.log(err);
        })
        .finally (() => {
          setIsLoading(false)
        }) 

    }
  }


  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (isFilteredMovies.length === 0) {
        setIsNotFound(true);
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
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialMovies(movies);
      console.log("movies");
      if (localStorage.getItem("shortMovies") === "true") {
        setIsFilteredMovies(filterDuration(movies));
      } else {
        setIsFilteredMovies(movies);
      }
    } else {
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
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

          movies={isFilteredMovies}
          setIsNotFound={setIsNotFound}
          isNotFound={isNotFound}
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
