import React, {useEffect, useState} from "react";
import MoviesCardList from "../Movies/MoviesCardList";
import SearchForm from "../Movies/SearchForm";

function SavedMovies({  savedMovies,  handleCardDelete}) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovies); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены
  const [searchQuery, setSearchQuery] = useState('');
  

  function filterMovies(movies, request) { //поиск фильма по слову
    const moviesFiltered = movies.filter((movie) => {
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

  function filterDuration(movies) { //фильтр короткометражек по чекбк
    return  movies.filter((movie) => movie.duration < 40);
  }

  function onSearchMovies(request) {
    setSearchQuery(request);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(isShortMovies ? filterDuration(moviesList) : moviesList);
  }, [savedMovies, isShortMovies, searchQuery]);

useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

/*useEffect(() => {
    if (savedMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [savedMovies]);*/

  return (
    <main>
      <SearchForm onSearchMovies={onSearchMovies} onFilter={handleShortMovies}/>
      <MoviesCardList savedMovies={savedMovies} movies={filteredMovies} isSavedFilm={true} handleCardDelete={handleCardDelete}/>
    </main>
  );
}

export default SavedMovies;
