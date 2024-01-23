import React from 'react';
import { FaStar, FaStarHalfAlt  } from 'react-icons/fa';
import './StarRating.css';

const StarRating = ({ vote_average }) => {
    // console.log("value comes", vote_average)
  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.min(Math.round(vote_average * 2) / 2, 5);

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<FaStar key={i} className="star-empty"  />);
      } else if (i - 0.5 === roundedRating) {
        stars.push(<FaStarHalfAlt  key={i} className="star-empty" />);
      } else {
        stars.push(<FaStar key={i} className="star-filled"  style={{fontSize:"24px"}} />);
      }
    }

    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
