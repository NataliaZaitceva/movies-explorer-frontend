import React, {useEffect, useState} from "react";
import MoviesCardList from "../Movies/MoviesCardList";
import SearchForm from "../Movies/SearchForm";
import { filterDuration, filterMovies } from "../../utils/constants";
function SavedMovies({  savedMovies, handleCardSaved, handleCardDelete}) {
  const [searchRequest, setSearchRequest] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(savedMovies); 
  const [isShortMovies, setIsShortMovies] = useState(false); 
  const [isNotFound, setIsNotFound] = useState(false); 

  
  function onSearchMovies(request) {
    setSearchRequest(request);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchRequest);
    setFilteredMovies(isShortMovies ? filterDuration(moviesList) : moviesList);
  }, [savedMovies, isShortMovies, searchRequest]);

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
      <MoviesCardList savedMovies={savedMovies} movies={filteredMovies} handleCardSaved={handleCardSaved} isSavedFilm={true} handleCardDelete={handleCardDelete}/>
    </main>
  );
}

export default SavedMovies;
