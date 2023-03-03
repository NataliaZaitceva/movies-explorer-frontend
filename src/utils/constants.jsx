export function filterMovies(movies, request) {
    const moviesFiltered =  movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase();
      const movieEn = String(movie.nameEN).toLowerCase();
      const userRequest = request.toLowerCase()
      return (
        movieRu.indexOf(userRequest) !== -1 ||
        movieEn.indexOf(userRequest) !== -1
      );
    });
    return moviesFiltered;
  }

 export  function filterDuration(movies) {
    return movies.filter((movie) => movie.duration < SHORTMOVIE);
  }
  
export const SHORTMOVIE = 40;

export const DESKTOP = 1200;

export const TABLET = 769;

export const MOBILE = 500;

export const DESKTOP_MORE_FIlMS = 3;

export const TABLET_MORE_FIlMS = 3;

export const MOBILE_MORE_FIlMS = 2;