import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(){
    return(
        <section className="filter">
            <div className="filter__checkbox">
            <label className="filter__input">
            <input type="checkbox" className="filter__input_input"/>
                <span className="filter__input_slider" />
             
</label>
<p className="filter__text"> Короткометражки</p>   
            </div>
        </section>
    )
}

export default FilterCheckbox;