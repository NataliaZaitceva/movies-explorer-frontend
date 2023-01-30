import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "./FilterCheckbox";
import { Routes, Route, } from "react-router-dom";
function SearchForm() {

const Line = `${
  window.location.pathname === '/movies' ? "search-form__line" : "search-form__line-shadow"
}`
  
 return (

  
    <section className="search-form">
      <form action="" className="search-form__form">
        <label for="site-search" />
        <input
          className="search-form__input"
          placeholder="Фильм"
          id="site-search"
          type="text"
          name="name"
          required
        ></input>

        <button className="search-form__find" type="submit" placeholder="" />
      </form>

      <FilterCheckbox />

<div className={Line} />

    </section> 
    
    
  );
}

export default SearchForm;
