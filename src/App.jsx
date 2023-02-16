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
import * as movieApi from "./utils/MovieApi";
import success from "./images/succes.svg";
import fail from "./images/fail.svg";
import InfoTooltip from "./components/InfoTooltip/InfoTooltip";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProfilePopup from "./Popup/EditProfilePopup";


function App() {

  

  const [currentUser, setCurrentUser] = useState({});
const [isLoggedIn, setIsLoggedIn] = useState(false);
//const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwt'))
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [dataInfoTool, setDataInfoTool] = useState({ text: "", image: "" });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
 
  const [isSavedMovie, setIsSavedMovie] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [usersList, setUsersList] = useState(false)
const location = useLocation();
  const history = useNavigate();
const path = location;

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }



  
  function handleRegister({name, email, password}) {
    auth
      .register(name, email, password)
      .then((user) => {
        handleLogin({ email, password });
     setCurrentUser(name, email)
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
        setSavedMovies([newMovie, ...savedMovies]);
localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
 console.log(movieData)
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

React.useEffect(() =>   {
   const usersMovies = localStorage.getItem('savedMovies') || [];            
setSavedMovies(JSON.parse(usersMovies)); 
}, [])




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
        .getCards('jwt')
        
        .then(() => {
const usersMovies = localStorage.getItem('savedMovies') || [];            
setSavedMovies(JSON.parse(usersMovies)); 
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


React.useEffect(() => {
    if (localStorage.getItem('savedMovies') === 'true') {
      setUsersList(true);
    } else {
      setUsersList(false);
    }
  }, []);



  function handleCardDelete(movie) {
    auth
      .deleteCard(movie._id)
      .then(() => {
        setSavedMovies((oldMovies) => 
        oldMovies.filter((oldMovie) => oldMovie._id !== movie._id));
         setDataInfoTool({
        text: "Удалено",
        image: success,
      });
      handleInfoTooltipOpen();
      })
     
      .catch(() => {
    
        setDataInfoTool({
          text: "Что-то пошло не так! Попробуйте еще раз",
          image: fail,
        });
        handleInfoTooltipOpen();
      });
  }

  function signOut() {

 // localStorage.clear();

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
          <Header />
      
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
