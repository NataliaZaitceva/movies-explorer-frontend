import React, {useState} from "react";
import MoviesCardList from "../Movies/MoviesCardList";
import SearchForm from "../Movies/SearchForm";
import { filterDuration, filterMovies } from "../../utils/constants";
function SavedMovies({  savedMovies, handleCardSaved, handleCardDelete}) {
  const [searchRequest, setSearchRequest] = useState('');
  const [isFilteredMovies, setIsFilteredMovies] = useState(savedMovies); 
  const [isShortMovies, setIsShortMovies] = useState(false); 
  const [isNotFound, setIsNotFound] = useState(false); 

  
  function onSearchMovies(request) {
    setSearchRequest(request);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  React.useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchRequest);
    setIsFilteredMovies(isShortMovies ? filterDuration(moviesList) : moviesList);
  }, [savedMovies, isShortMovies, searchRequest]);

React.useEffect(() => {
    if (isFilteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [isFilteredMovies]);


  return (
    <main>
      <SearchForm onSearchMovies={onSearchMovies} onFilter={handleShortMovies}/>
      <MoviesCardList savedMovies={savedMovies} movies={isFilteredMovies} handleCardSaved={handleCardSaved} handleCardDelete={handleCardDelete}/>
    </main>
  );
}

export default SavedMovies;
