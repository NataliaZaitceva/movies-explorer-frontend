import React, { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import SavedMovies from "./components/SavedMovies/SavedMovies";
import "./App.css";
import Movies from "./components/Movies/Movies";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import { CurrentUserContext } from "./context/CurrentUserContext";
import auth from "./utils/MainApi";
import success from "./images/succes.svg";
import fail from "./images/fail.svg";
import InfoTooltip from "./components/InfoTooltip/InfoTooltip";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProfilePopup from "./Popup/EditProfilePopup";
import NotFound from "./components/NotFound/NotFound";
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [dataInfoTool, setDataInfoTool] = useState({ text: "", image: "" });
  const [savedMovies, setSavedMovies] = useState([]);
  const [listMovies, setListMovies] = useState([])
  const [isEdit, setIsEdit] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const location = useLocation();
  const history = useNavigate();
  const path = location;

  const NoMatchPage = () => {return (<NotFound />)};

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleRegister({ name, email, password }) {
    auth
      .register(name, email, password)
      .then(() => {
        handleLogin({ name, email, password, });
        setCurrentUser(name, email);
      })
      .catch(() => {
        setDataInfoTool({
          text: "Что-то пошло не так! Попробуйте еще раз",
          image: fail,
        });
        handleInfoTooltipOpen();
      });
  }

  function handleLogin({ email, password}) {


    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          setCurrentUser({email, password});
          setIsLoggedIn(true);
          history("/movies");
        }
      })
      .catch(() => {
        setDataInfoTool({
          text: "Что-то пошло не так! Попробуйте еще раз",
          image: fail,
        });
        handleInfoTooltipOpen();
        console.log(' не авторизовался"');
      });
  }

  function handleCardSaved(movieData) {
 
   auth
      .createMovie( movieData)
      .then((newMovie) => {
        const newFilms = [...savedMovies, newMovie];

        localStorage.setItem("savedMovies", JSON.stringify(newFilms));
        setSavedMovies((savedMovies) => [...savedMovies, newMovie]);

        console.log(movieData);
        console.log(newMovie);
        setDataInfoTool({
          text: "Сохранено",
          image: success,
        });
        handleInfoTooltipOpen();

        console.log(savedMovies);
      })
      .catch(() => {
        console.log("проблема");
        setDataInfoTool({
          text: "Что-то пошло не так! Попробуйте еще раз",
          image: fail,
        });
        handleInfoTooltipOpen();
      });
  }


  React.useEffect(() => {

    const tokenCheck = () => {
      if (!localStorage.getItem("jwt")) {
        history("/");
        return;
      }
      const jwt = localStorage.getItem("jwt");

      auth
        .getContent(jwt)
        .then((user) => {
          if (user) {
        localStorage.removeItem("allMovies");
   // setSavedMovies('savedMovies')
            setIsLoggedIn(true);
            history(path);
          }
        })
        .catch((err) => {
          setIsLoggedIn(false);
          console.log(err);
        });
      };
      tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*React.useEffect(() =>   {
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
}, [savedMovies])*/

  /*React.useEffect(() =>   {
   const usersMovies = localStorage.getItem('savedMovies') || [];            
setSavedMovies(JSON.parse(usersMovies)); 
}, [])*/

  React.useEffect(() => {
    if (isLoggedIn){
      auth
      .getInfo()
      
      .then((name, email) => {
        setIsLoggedIn(true);
        setCurrentUser(name, email);
        history(path);
      });

      auth
        .getCards()

        .then((res) => {
        //  const usersMovies = localStorage.getItem("savedMovies") || [];
         // setSavedMovies(JSON.parse(usersMovies));
console.log('карточки');
           setSavedMovies(res)
          //setUsersList(usersMovies)
          
        });
      }
  }, [isLoggedIn]);

  /*React.useEffect(() => {
    if (localStorage.removeItem('movie._id')) {
      setNewUsersList(true);
    } else {
      setNewUsersList(false);
    }
  }, []);*/

  function handleCardDelete(movie) {
    auth
      .deleteCard(movie._id)
      .then(() => {
        const newMovies = savedMovies.filter(
          (savedMovie) => savedMovie._id !== movie._id
        );
//        localStorage.removeItem("movie._id");

        localStorage.setItem("savedMovies", JSON.stringify(newMovies));

        setSavedMovies(newMovies);
        setDataInfoTool({
          text: "Удалено",
          image: success,
        });
        handleInfoTooltipOpen();
        console.log(movie._id);
      })

      .catch(() => {
        setDataInfoTool({
          text: "Что-то пошло не так! Попробуйте еще раз",
          image: fail,
        });
        handleInfoTooltipOpen();
      });
  }

  /*React.useEffect(() =>   {
   const newUsersMovies = localStorage.getItem('savedMovies') || [];            
setSavedMovies(JSON.parse(newUsersMovies)); 
}, [])*/

  function signOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    //localStorage.removeItem('savedMovies');
    localStorage.removeItem('movieSearch')
    localStorage.removeItem('allFindedMovies') 
    localStorage.removeItem('movies') 
    setListMovies([])
    history("/");
  }

  function closePopup() {
    setIsInfoTooltipOpen(false);
    setIsEditProfilePopupOpen(false);
  }

  function handleUpdateUser(formData) {
  
    auth
      .setUserInfo(formData)

      .then((formData) => {
        setIsEdit(true);
        setCurrentUser(formData);
        closePopup();
      })
      .catch((email) => {
        if (email.length > 0) {
       alert("Уже используется")
      }
    })
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header isLoggedIn={isLoggedIn} />

          <Routes>
            <Route path="/" element={<Main />} />

            <Route
              path="/movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies
                    isLoggedIn={isLoggedIn}
                    handleCardSaved={handleCardSaved}
                    savedMovies={savedMovies}
                    handleCardDelete={handleCardDelete}
                    isOpen={isInfoTooltipOpen}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies
                    handleCardDelete={handleCardDelete}
                    handleCardSaved={handleCardSaved}
                    savedMovies={savedMovies}
                    isLoggedIn={isLoggedIn}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    isLoggedIn={isLoggedIn}
                    onClick={signOut}
                    // onUpdateUser={handleUpdateUser}
                    onEditProfile={handleEditProfileClick}
                  />
                </ProtectedRoute>
              }
            />
 
            <Route
              path="signup" element={
                isLoggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Register onRegister={handleRegister} />
              )
              }/>

            <Route path="signin"  element={
                isLoggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Login onLogin={handleLogin}/>
                )
              }/>
            <Route path='*'
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <NoMatchPage
                  />
                </ProtectedRoute>
              }
            /> 
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
  
          </Routes>
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closePopup}
            text={dataInfoTool.text}
            image={dataInfoTool.image}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closePopup}
            onUpdateUser={handleUpdateUser}
          />
        
        </div>

        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
