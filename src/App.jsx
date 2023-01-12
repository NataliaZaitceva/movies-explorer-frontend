import React, { useState } from "react";
import { Navigate, BrowserRouter as Router, Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";
import { CurrentUserContext } from "./context/CurrentUserContext";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import SavedMovies from "./components/SavedMovies/SavedMovies";
import './App.css'
import Movies
 from "./components/Movies/Movies";
 import Register from "./components/Register/Register"
 import Profile from "./components/Profile/Profile";
function App() {
  return (
    <BrowserRouter>
    <div className="page">
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="movies" element={<Movies />} />
        <Route path="saved-movies" element={<SavedMovies />} />
        <Route path="profile" element={<Profile />} />
        <Route path="signup" element={<Register />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
