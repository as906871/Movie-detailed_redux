const initialState = {
    popularMovies: [],
    movieDetail: null,
    movieCastDetail:[],
    upcomingMovie:[],
    movies: [],
    searchResults: [],
    error: null,
  };
  
  const movieReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_POPULAR_MOVIES_SUCCESS':
        return { ...state, popularMovies: action.payload, error: null };
      case 'FETCH_POPULAR_MOVIES_FAILURE':
        return { ...state, popularMovies: [], error: action.payload };
      case 'FETCH_MOVIE_DETAIL_SUCCESS':
        return { ...state, movieDetail: action.payload, error: null };
      case 'FETCH_MOVIE_CAST_SUCCESS':
        return { ...state, movieCast: action.payload };
      case 'FETCH_MOVIE_CAST_FAILURE':
        return { ...state, error: action.payload };
      case 'FETCH_UPCOMING_MOVIES_SUCCESS':
        return { ...state, upcomingMovie: action.payload };
      case 'FETCH_UPCOMING_MOVIES_FAILURE':
        return { ...state, error: action.payload };
      case 'FETCH_TOP_RATED_MOVIES_SUCCESS':
        return {...state, movies: action.payload };
      case 'FETCH_SEARCH_RESULTS_SUCCESS':
        return { ...state, searchResults: action.payload, error: null };
      case 'FETCH_SEARCH_RESULTS_FAILURE':
        return { ...state, searchResults: [], error: action.payload };
      default:
        return state;
    }
  };
  
  export default movieReducer;