import React, { useState, useEffect } from "react";
import "./Appbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {fetchPopularMovies, fetchMovies, fetchSearchResults } from "../../redux/actions/movieActions";

const Appbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [movieName, setMovieName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchSearchResults(movieName));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHome = () => {
    navigate("/");
    dispatch(fetchMovies());
  };

  const handlePopularClick = () => {
    dispatch(fetchPopularMovies());
    console.log("working");
  };

  const handleChange = (e) => {
    setMovieName(e.target.value);
    dispatch(fetchSearchResults(e.target.value));
  };

  return (
    <div>
      <div className={`app-bar ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo" onClick={handleHome}>Akshay</div>
        <div className="search-bar">
          <p style={{ fontSize: "20px" }} onClick={handlePopularClick}>
            Popular
          </p>
          <p style={{ fontSize: "20px" }}>Top-Rated</p>
          <p style={{ fontSize: "20px" }}>Upcoming</p>
          <input
            type="text"
            placeholder="Search..."
            style={{ height: "35px", borderRadius: "10px" }}
            value={movieName}
            onChange={handleChange}
          />
          <button className="butt" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
