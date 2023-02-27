import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  BrowserRouter,
  useLocation,
  useResolvedPath,
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
import {CurrentUserContext} from "./context/CurrentUserContext";
import auth from "./utils/MainApi";
import success from "./images/succes.svg";
import fail from "./images/fail.svg";
import InfoTooltip from "./components/InfoTooltip/InfoTooltip";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProfilePopup from "./Popup/EditProfilePopup";
import * as movieApi from './utils/MovieApi'


function App() {

  

  const [currentUser, setCurrentUser] = useState({});
const [isLoggedIn, setIsLoggedIn] = useState(false);
//const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwt'))
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [dataInfoTool, setDataInfoTool] = useState({ text: "", image: "" });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
const [isFilm, setIsFilm] = useState({})
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
 
  const [isSavedMovie, setIsSavedMovie] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [usersList, setUsersList] = useState(false)
 const [newUsersList, setNewUsersList] = useState(false)

 const [isShortMovies, setIsShortMovies] = useState(false);


const location = useLocation();
  const history = useNavigate();
const path = location;

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize");
    }, 600);
  });



  function handleRegister({name, email, password}) {
    auth
      .register(name, email, password)
      .then((user) => {
        handleLogin({ email, password });
     setCurrentUser(user)
      })
      .catch(() => {
        setDataInfoTool({
          text: "Что-то пошло не так! Попробуйте еще раз",
          image: fail,
        });
        handleInfoTooltipOpen();
      });
  }
  
  function handleLogin({email, password}) {
    auth
  .authorize(email, password)
      .then((res) => {
       if (res) {    
     localStorage.setItem("jwt", res.token);
  
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
        console.log(' не авторизовался"')
      });
      
  }



  function handleCardSaved(movieData) {

    auth
      .createMovie(movieData)
      .then((newMovie) => {
    const newFilm = [...savedMovies, newMovie];

        
localStorage.setItem('savedMovies', JSON.stringify(newFilm));
setSavedMovies(savedMovies => ([...savedMovies, newMovie]))
 console.log(movieData)
 console.log(newMovie)
       setDataInfoTool({
          text: "Сохранено",
          image: success,
        });
        handleInfoTooltipOpen();
 
   console.log(savedMovies)
      })
      .catch(() => {
        console.log('проблема')
        setDataInfoTool({
          text: "Что-то пошло не так! Попробуйте еще раз",
          image: fail,
        });
        handleInfoTooltipOpen();
      })
  }



  React.useEffect(() => {
    const tokenCheck = () => {
    if(!localStorage.getItem('jwt')) {
      history('/');
      return
    };
    const jwt = localStorage.getItem('jwt');
   
      auth
        .getContent(jwt)
        .then((user) => {
          if (user) {
       localStorage.removeItem('allMovies');
            
  
setIsLoggedIn(true);
        history(path);
          }
      
        })
        .catch((err) => {
          setIsLoggedIn(false)
          console.log(err);
        });
    };
    tokenCheck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



/*React.useEffect(() =>   {
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
}, [savedMovies])*/

/*React.useEffect(() =>   {
   const usersMovies = localStorage.getItem('savedMovies') || [];            
setSavedMovies(JSON.parse(usersMovies)); 
}, [])*/



function getFilms() {
  movieApi
     .getMovies()
     .then((moviesData) => {
     setIsFilm(moviesData);
       console.log("загрузка фильмов");
       console.log(moviesData)
     })
     .catch(() => {
      
      console.log(" фильмов нет");
     })
 }



React.useEffect(() => {

  const jwt = localStorage.getItem('jwt')

    if (jwt) {
  auth
        .getInfo()
        .then(data => {
          setIsLoggedIn(true)
          setCurrentUser(data);  
          history(path)   
        })  
     

  auth 
        .getCards()
        
        .then(() => {
      
const usersMovies = localStorage.getItem('savedMovies') || [];            
setSavedMovies(JSON.parse(usersMovies)); 
//localStorage.setItem('savedMovies' )
//console.log(localStorage.setItem('savedMovies')

//setSavedMovies(usersMovies)
//setUsersList(usersMovies)
        console.log(usersMovies)
        })
        .catch((err) => {
          console.log("ошибка получения списка карточек");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 


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


const newMovies = savedMovies.filter((savedMovie) => savedMovie._id !== movie._id);
localStorage.removeItem('movie._id');

localStorage.setItem('savedMovies', JSON.stringify(newMovies));

setSavedMovies(newMovies)
setDataInfoTool({
  text: "Удалено",
  image: success,
});
handleInfoTooltipOpen();
console.log(movie._id)

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

localStorage.clear();
    setIsLoggedIn(false);
    history("/");
  }

  function closePopup() {
    setIsInfoTooltipOpen(false);
    setIsEditProfilePopupOpen(false);
  }

  function handleUpdateUser(formData) {
    auth
      .setUserInfo(formData)
     
      .then((name, email) => {
        setIsEdit(true)
        setCurrentUser(name, email)
closePopup()
      })
      .catch((err) => console.log(err));
    
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }


  return (
     
    <>
      <CurrentUserContext.Provider value={currentUser}>   
        <div className="page">
          <Header isLoggedIn={isLoggedIn}/>
      
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
        
getFilms={getFilms}
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
                    
                    isLoggedIn = {isLoggedIn}
                    onClick={signOut}
                   // onUpdateUser={handleUpdateUser}
                    onEditProfile={handleEditProfileClick}

                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="signup"
              element={<Register onRegister={handleRegister} />}
            />
            <Route path="signin" element={<Login onLogin={handleLogin} />} />
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
