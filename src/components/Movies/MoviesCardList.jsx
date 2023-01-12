import React from "react";
import MoviesCard from "./MoviesCard";
import './MoviesCardList.css';

function MoviesCardList() {
    return (
<div className="movies__list">
    <MoviesCard />
    <MoviesCard />
    <MoviesCard />
    <MoviesCard />
    <MoviesCard />
    <MoviesCard />
    <MoviesCard />
    <MoviesCard />

</div>
  )
}

export default MoviesCardList;
