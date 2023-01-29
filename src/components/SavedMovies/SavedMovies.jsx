import React from "react";
import MoviesCardList from "../Movies/MoviesCardList";
import SearchForm from "../Movies/SearchForm";

function SavedMovies() {
  return (
    <main>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default SavedMovies;
