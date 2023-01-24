import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "./FilterCheckbox";
function SearchForm() {
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
        ></input>

        <button className="search-form__find" type="submit" placeholder="" />
      </form>
      <FilterCheckbox />
      <div className="search-form__line"></div>
    </section>
  );
}

export default SearchForm;
