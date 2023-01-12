import React from "react";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer"
function Movies() {
    return (
        <section className="movies">
            <Header />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </section>
    )
}

export default Movies;