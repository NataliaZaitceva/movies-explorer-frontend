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
    return movies.filter((movie) => movie.duration < 40);
  }
  
