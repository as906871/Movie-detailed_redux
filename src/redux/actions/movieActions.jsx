import axios from 'axios';

const apiKey = 'c45a857c193f6302f2b5061c3b85e743';
const baseUrl = 'https://image.tmdb.org/t/p/w500';

// ......................FETCH MOVIES..................

export const fetchMovies = () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      const movieBaseUrl = response.data.results.map((movie) => ({
        ...movie,
        backdrop_path: `${baseUrl}${movie.backdrop_path}`,
        poster_path: `${baseUrl}${movie.poster_path}`,
      }));

      dispatch({ type: 'FETCH_POPULAR_MOVIES_SUCCESS', payload: movieBaseUrl });
    } catch (error) {
      dispatch({ type: 'FETCH_POPULAR_MOVIES_FAILURE', payload: error.message });
    }
  };
};




// .........................FETCH MOVIE DETAIL ...............................

export const fetchMovieDetail = (movieId) => {
  const urls = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

  return async (dispatch) => {
    try {
      const response = await axios.get(urls);
      const movieDetailWithBaseUrl = {
        ...response.data,
        backdrop_path: `${baseUrl}${response.data.backdrop_path}`,
        poster_path: `${baseUrl}${response.data.poster_path}`,
      };

      dispatch({ type: 'FETCH_MOVIE_DETAIL_SUCCESS', payload: movieDetailWithBaseUrl });
    } catch (error) {
      dispatch({ type: 'FETCH_MOVIE_DETAIL_FAILURE', payload: error.message });
    }
  };
};




// ............................ CAST ROLE DETAIL ..........................


export const fetchMovieCast = (movieId) => {
  const urling = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`;

  return async (dispatch) => {
    try {
      const response = await axios.get(urling);
      const moviecast = response.data.cast.map((castMember) => ({
        ...castMember,
        profile_path: `${baseUrl}${castMember.profile_path}`,
      }));
      dispatch({ type: 'FETCH_MOVIE_CAST_SUCCESS', payload: moviecast });
    } catch (error) {
      dispatch({ type: 'FETCH_MOVIE_CAST_FAILURE', payload: error.message });
    }
  };
};




// ..........................UPCOMING MOVIES .............................


export const fetchUpcomingMovies = () => {
  const staticDate = '2024-01-01';
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)
      const upcomingMoviesWithBaseUrl = response.data.results
        .filter((movie) => movie.release_date >= staticDate)
        .map((movie) => ({
          ...movie,
          backdrop_path: `${baseUrl}${movie.backdrop_path}`,
          poster_path: `${baseUrl}${movie.poster_path}`,
        }));
      dispatch({ type: 'FETCH_POPULAR_MOVIES_SUCCESS', payload: upcomingMoviesWithBaseUrl });
    } catch (error) {
      dispatch({ type: 'FETCH_POPULAR_MOVIES_SUCCESS', payload: error.message });
    }
  };
};




// ........................ SORT DATA BY POPULARITY..........................


export const fetchTopRatedMovies = () => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      const modifiedMovies = response.data.results.map((movie) => ({
        ...movie,
        backdrop_path: `${baseUrl}${movie.backdrop_path}`,
        poster_path: `${baseUrl}${movie.poster_path}`,
      }));
      modifiedMovies.sort((a, b) => a.popularity - b.popularity);
      dispatch({ type: 'FETCH_POPULAR_MOVIES_SUCCESS', payload: modifiedMovies });
    } catch (error) {
      dispatch({ type: 'FETCH_POPULAR_MOVIES_FAILURE', payload: error.message });
    }
  };
};



// ...........................SEARCH MOVIES RESULT ......................


export const fetchSearchResults = (movieName) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=1`;

  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      const modifiedMovies = response.data.results.map((movie) => ({
        ...movie,
        backdrop_path: `${baseUrl}${movie.backdrop_path}`,
        poster_path: `${baseUrl}${movie.poster_path}`,
      }));
      dispatch({ type: 'FETCH_SEARCH_RESULTS_SUCCESS', payload: modifiedMovies });
    } catch (error) {
      dispatch({ type: 'FETCH_SEARCH_RESULTS_FAILURE', payload: error.message });
    }
  };
};

