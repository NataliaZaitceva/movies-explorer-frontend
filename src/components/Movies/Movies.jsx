import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import MoreButton from "./MoreButton";
import "./Movies.css";
import * as movieApi from "../../utils/MovieApi";
import SavedMovies from "../SavedMovies/SavedMovies";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Movies({  handleCardSaved,  savedMovies, handleCardDelete }) {
  const [initialMovies, setInitialMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [allMovies, setAllMovies] = useState([]);
  const [isFilteredMovies, setIsFilteredMovies] = useState([]);
  const [isBadRequest, setIsBadRequest] = useState(false);
 // const [isRequestEmpty, setIsRequestEmpty] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  //const [savedMovies, setSavedMovies] = useState({})
  const [movies, setMovies] = useState(false);
//const [isSavedFilm, setIsSavedFilm] = useState([])
  const [isReqErr, setIsReqErr] = useState(false); //ошибка запроса к серверу
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены
const [isFilm, setIsFilm] = useState({})
const [isSavedFilm, setIsSavedFilm] = useState(false)
 
const currentUser = React.useContext(CurrentUserContext);


  function handleFilter(movies, request, short) { //метод фильтрации, который отдает массив на рендер
    const moviesList = filterMovies(movies, request, short);
    setInitialMovies(moviesList);
    console.log(moviesList.length);

    setIsFilteredMovies(short ? filterDuration(moviesList) : moviesList);
    localStorage.setItem("movies", JSON.stringify(moviesList));
    localStorage.setItem("allMovies", JSON.stringify(movies));

  }



  function onSearchMovies(request) {

    console.log('отправляем запрос')
    console.log(request)
    //  setIsRequestEmpty(false);
    localStorage.setItem("movieSearch", request);
    localStorage.setItem("shortMovies", isShortMovies);
     
//localStorage.setItem("savedMovies", isSavedFilm);

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      console.log("получаем ответ на запрос");
      handleFilter(movies, request, isShortMovies);
    } else {
   
      movieApi
        .getMovies()
        .then((cardsData) => {
          handleFilter(cardsData, request, isShortMovies);
        //  setIsReqErr(false);
 setIsFilm(cardsData);
          console.log("загрузка фильмов");
          console.log(cardsData)
        })
        .catch((err) => {
          setIsReqErr(true);

          console.log(err);
        })
      
    }
  }

  function filterMovies(movies, request) {
    const moviesFiltered =  movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim();
      const movieEn = String(movie.nameEN).toLowerCase().trim();
      const userRequest = request.toLowerCase().trim();
      return (
        movieRu.indexOf(userRequest) !== -1 ||
        movieEn.indexOf(userRequest) !== -1
      );
    });
    return moviesFiltered;
  }

  function filterDuration(movies) {
    return movies.filter((movie) => movie.duration < 40);
  }



  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);

    if (!isShortMovies) {
      if (filterDuration(initialMovies).length === 0) {
        setIsFilteredMovies(filterDuration(initialMovies));
        // filteredMovies.length === 0 ? setNothingFound(true) : setNothingFound(false);
      } else {
        setIsFilteredMovies(filterDuration(initialMovies));
        // filteredMovies.length === 0 ? setNothingFound(true) : setNothingFound(false);
      }
    } else {
      setIsFilteredMovies(initialMovies);
    }
    localStorage.setItem("shortMovies", !isShortMovies);
  }

 /* function handleSavedMovies() {
    setIsSavedFilm(!isSavedFilm);

    if (!isSavedFilm) {
      if (filterMovies(initialMovies).length === 0) {
        setIsSavedFilm(filterMovies(initialMovies));
        // filteredMovies.length === 0 ? setNothingFound(true) : setNothingFound(false);
      } else {
        setIsFilteredMovies(filterMovies(initialMovies));
        // filteredMovies.length === 0 ? setNothingFound(true) : setNothingFound(false);
      }
    } else {
      setIsFilteredMovies(initialMovies);
    }
    localStorage.setItem("savedMovies", isSavedFilm);

  }*/

    

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



  
/*useEffect(() => {
    if (localStorage.getItem("savedMovies")) {
      if (isSavedFilm.length === 0) {
      setIsBadRequest(true);
    } else {
      setIsBadRequest(false);
    } 
  } else {
      setIsBadRequest(false)
    }

  }, [isSavedFilm]);*/

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (isFilteredMovies.length === 0) {
      setIsBadRequest(true);
    } else {
      setIsBadRequest(false);
    } 
  } else {
      setIsBadRequest(false)
    }

  }, [isFilteredMovies]);





  
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
       //savedMovies={savedMovies}
          savedMovies={savedMovies}
          isLoading={isLoading}
          handleCardDelete={handleCardDelete}
          isShortMovies={isShortMovies}
isSavedFilm={true}
        />
      </div>
    </main>
  );
}

export default Movies;
