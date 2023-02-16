import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({onFilter, isShortMovies}) {
  return (
    <section className="filter">
      <div className="filter__checkbox">
        <label className="filter__input">
          <input type="checkbox" className="filter__input-input" 
          onChange={onFilter}
          checked={isShortMovies}/>
          <span className="filter__input-slider" />
        </label>
        <p className="filter__text"> Короткометражки</p>
      </div>
    </section>
  );
}

export default FilterCheckbox;
