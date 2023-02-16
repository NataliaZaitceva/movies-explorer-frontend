import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import { useForm } from "react-hook-form";

import FilterCheckbox from "./FilterCheckbox";
import { Routes, Route, useLocation, } from "react-router-dom";

function SearchForm({ onSearchMovies, onFilter, isShortMovies }) {

  const [isRequestError, setIsRequestError] = useState(false);
 const [request, setRequest] = useState("");
const location = useLocation()

const {
  register,
  formState: { errors },
  handleSubmit, reset
} = useForm({
  mode: "onBlur",
});

const onSubmit = (data) => {
  onSearchMovies(request);
  reset()
};

/*function handleSearch() {
  
  if (request.length === 0) {
    console.log ('тут пустой запрос')
  } else {

    onSearchMovies(request);
     console.log ('must be a card')
  }
 
}*/


function handleChangeRequest(e) {
  setRequest(e.target.value);
}

const Line = `${
  window.location.pathname === '/movies' ? "search-form__line" : "search-form__line-shadow"
}`
  
 return (

  
    <section className="search-form">
      <form onSubmit={handleSubmit(onSubmit)} action="" className="search-form__form" >
        <label htmlFor="search" />
        <input
         {...register("search",        
         {
             required: "Нужно ввести ключевое слово",
            
           },
           
           )}
          className="search-form__input"
          placeholder="Фильм"
          name="search"
          onChange={handleChangeRequest}
   
        ></input>
     {errors?.search && (
       <span className="search__form-error">
         {errors?.search?.message || "Error!"}
       </span>
     )}
        <button className="search-form__find" type="submit" placeholder="" />
      </form>

      <FilterCheckbox onFilter={onFilter} isShortMovies={isShortMovies}/>

<div className={Line} />

    </section> 
    
    
  );
}

export default SearchForm;
