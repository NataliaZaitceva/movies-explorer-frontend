import React from "react";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import Footer from "../Footer/Footer";
import MoreButton from "./MoreButton";
import "./Movies.css";

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
