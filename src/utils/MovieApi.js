const checkResponse = (res) => {
  if (res.ok) {
    return res.json(); //если да, то возвращает полученные данные
  }
  return Promise.reject(`Error: ${res.status}`); //иначе возвращает ошибку
};


export function getMovies() {
    return fetch('https://api.nomoreparties.co/beatfilm-movies' , {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
             },
    }).then((res) => checkResponse(res));
  }

