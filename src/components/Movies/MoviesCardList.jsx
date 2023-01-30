import React from "react";
import MoviesCard from "./MoviesCard";
import "./MoviesCardList.css";
import MoreButton from "./MoreButton";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import pic from "../../images/pic.jpg";
import pic2 from "../../images/pic2.png";
import pic3 from "../../images/pic3.png";
import pic4 from "../../images/pic4.png";
import pic5 from "../../images/pic5.png";
import pic6 from "../../images/pic6.png";
import pic7 from "../../images/pic8.png";
import pic9 from "../../images/pic2.png";
import pic10 from "../../images/pic10.png";
import pic8 from "../../images/pic8.png";
import pic11 from "../../images/pic11.png";
import { useState } from "react";

const movies = [
  {
    _id: 1,
    image: pic,
    title: "В погоне за Бэнкси",
    duration: "27 минут",
    saved: true,
  },
  {
    _id: 2,
    image: pic2,
    title: "В погоне за Бэнкси",
    duration: "27 минут",
    saved: true,
  },
  {
    _id: 3,
    image: pic3,
    title: "В погоне за Бэнкси",
    duration: "27 минут",
    saved: false,
  },
  {
    _id: 4,
    image: pic4,
    title: "В погоне за Бэнкси",
    duration: "27 минут",
    saved: false,
  },
  {
    _id: 5,
    image: pic5,
    title: "В погоне за Бэнкси",
    duration: "27 минут",
    saved: false,
  },
  {
    _id: 6,
    image: pic6,
    title: "В погоне за Бэнкси",
    duration: "27 минут",
    saved: true,
  },
  {
    _id: 7,
    image: pic7,
    title: "В погоне за Бэнкси",
    duration: "27 минут",
    saved: true,
  },
  {
    _id: 8,
    image: pic8,
    title: "В погоне за Бэнкси",
    duration: "27 минут",
    saved: false,
  },
  {
    _id: 9,
    image: pic9,
    title: "В погоне за Бэнкси",
    duration: "27 минут",
    saved: false,
  },
  {
    _id: 10,
    image: pic10,
    title: "В погоне за Бэнкси",
    duration: "27 минут",
    saved: false,
  },
  {
    _id: 11,
    image: pic11,
    title: "В погоне за Бэнкси",
    duration: "27 минут",
    saved: false,
  },
];

function MoviesCardList(props) {
  return (
    <>
      <ul className="cards-list">
        {movies.map((movie) => {
          return <MoviesCard key={movie._id} card={movie} />;
        })}
      </ul>
      <MoreButton />
    </>
  );
}

export default MoviesCardList;
