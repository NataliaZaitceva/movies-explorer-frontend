export class Auth {
     constructor(baseUrl) {
        this._baseUrl = baseUrl
     }

     
     _getResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      }


  register(name, email, password) {
    return fetch('https://api.cinema.nomoredomains.club/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._getResponse(res));
};

authorize(email, password) {
    return fetch('https://api.cinema.nomoredomains.club/signin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email,
        password: password}),
    }).then((res) => this._getResponse(res));
  }

setUserInfo(user) {
    return fetch('https://api.cinema.nomoredomains.club/users/me', {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      }),
    }).then((res) => this._getResponse(res));
  }


  getInfo() {
    return fetch('https://api.cinema.nomoredomains.club/users/me', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      
      },
   
    }).then((res) => this._getResponse(res)); 
  }

  
    getContent(token) {
      return fetch('https://api.cinema.nomoredomains.club/users/me', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }).then((res) => this._getResponse(res)); 
  }



getCards() {
  return fetch('https://api.cinema.nomoredomains.club/movies', {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
  
    },
  }).then(this._getResponse);
}

createMovie(data) 
  {
  return fetch('https://api.cinema.nomoredomains.club/movies', {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json",
     // Accept: 'application/json'
    },
    body: JSON.stringify({
    country: data.country,
    director:  data.director,
    duration:  data.duration,
    year:  data.year,
    description:  data.description,
    image: `https://api.nomoreparties.co${data.image.url}`,
    trailerLink:  data.trailerLink,
    thumbnail:  `https://api.nomoreparties.co${ data.image.formats.thumbnail.url}`,
    movieId:  data.id,
    nameRU:  data.nameRU,
    nameEN:  data.nameEN,
 //owner:  data.owner,
    })
  }).then((res) => this._getResponse(res));
  
  }

deleteCard(cardId) {
  return fetch(`https://api.cinema.nomoredomains.club/movies${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    },
  }).then(this._getResponse);
}

}

const auth = new Auth ('https://api.cinema.nomoredomains.club')

export default auth;