import React from "react";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import Footer from "../Footer/Footer";
import MoreButton from "./MoreButton";
import "./Movies.css";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
    </section>
  );
}

export default Movies;
