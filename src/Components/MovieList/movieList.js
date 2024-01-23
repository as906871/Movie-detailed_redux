import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/actions/movieActions";
import { Link } from "react-router-dom";
import "../../App.css";

const MovieList = () => {
  const itemsPerPage = 8; 
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { popularMovies, error, upcomingMovie, searchResults } = useSelector((state) => state.movies);
  // console.log("upcoming movie", upcomingMovie);

  useEffect(() => {
    dispatch(fetchMovies(currentPage));
  }, [dispatch,currentPage]);
  
  useEffect(() => {
    if (searchResults.length === 0) {
      dispatch(fetchMovies());
    }
  }, [searchResults, dispatch]);

  // const moviesToDisplay =
  //   searchResults.length > 0 ? searchResults : popularMovies;
  const moviesToDisplay =
  searchResults.length > 0
    ? searchResults
    : upcomingMovie.length > 0
    ? upcomingMovie
    : popularMovies;

  if (error) {
    return <div>Error: {error}</div>;
  }

  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentMovies = moviesToDisplay.slice(indexFirst, indexLast);
  // console.log( "current movies",currentMovies )

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log("paginate", paginate);

  return (
    <div className="hero-container">
      {currentMovies.map((movie, i) => (
        <div className="main-container" key={i}>
          <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="poster-container">
              <img src={movie.poster_path} className="poster" alt={movie.title} />
            </div>
            <div className="ticket-container">
              <div className="ticket__content">
                <h4 className="ticket__movie-title">{movie.title}</h4>
                <p className="ticket__movie-slogan">{movie.overview}</p>
                <p className="ticket__current-price">
                  <span style={{ color: "black", marginRight: "10px" }}> Rating:- </span>
                  {movie.vote_average}
                </p>
                <p className="ticket__old-price">
                  <span style={{ color: "black", marginRight: "10px", fontSize: "20px", fontWeight: "800" }} >
                    Release Date:-
                  </span>
                  {movie.release_date}
                </p>
                <p className="ticket__old-price">
                  <span style={{ color: "black", marginRight: "10px", fontSize: "20px", fontWeight: "800" }} >
                    Popularity:-
                  </span>
                  {movie.popularity}
                </p>
                <button className="ticket__buy-btn">{movie.title}</button>
              </div>
            </div>
          </Link>
        </div>
      ))}
      {Array.from({ length: Math.ceil(moviesToDisplay.length / itemsPerPage) }, (_, index) => index + 1).length > 1 && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(moviesToDisplay.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
            <button key={pageNumber} onClick={() => paginate(pageNumber)} className={currentPage === pageNumber ? "active" : ""}>
              {pageNumber}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default MovieList;
