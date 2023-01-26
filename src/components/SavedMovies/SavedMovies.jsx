import React from "react";
import MoviesCardList from "../Movies/MoviesCardList";
import SearchForm from "../Movies/SearchForm";
import Footer from "../Footer/Footer";

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
    </>
  );
}

export default SavedMovies;
