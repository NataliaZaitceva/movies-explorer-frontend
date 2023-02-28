const checkResponse = (res) => {
  if (res.ok) {
    return res.json(); 
  }
  return Promise.reject(`Error: ${res.status}`);
};


export function getMovies() {
    return fetch('https://api.nomoreparties.co/beatfilm-movies' , {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
             },
    }).then((res) => checkResponse(res));
  }

