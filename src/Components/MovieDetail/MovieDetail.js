import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetail,fetchMovieCast,} from "../../redux/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";
import "./movietailed.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import StarRating from "../StarRating/StarRating";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./movietailed.css";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetail, movieCast, error } = useSelector((state) => state.movies);
  const [loading, setLoading] = useState(true);
  //   console.log(movieCast,"casting role")

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        await dispatch(fetchMovieDetail(id));
        await dispatch(fetchMovieCast(id));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchDetail();
  }, [dispatch, id]);

  //   console.log(movieDetail, "moviesdetail");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const settings = {
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500, 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div>
      <div id="content_hero" class="center-content hero-ontop"
        style={{ backgroundImage: `url(${movieDetail.backdrop_path})`,marginTop: "80px"}}>
        <div class="container">
          <div class="row blurb scrollme animateme" data-when="exit" data-from="0" data-to="1" data-opacity="0" data-translatey="100">
            <div class="col-md-9">
              <h1>{movieDetail.title}</h1>
              <p>{movieDetail.overview}</p>
              <div class="buttons">
                <span class="certificate">PG</span>
                <label data-vbtype="video" class="venobox btn btn-default vbox-item" >
                  <i class="material-icons">play_arrow</i>
                  <span>Play trailer</span>
                </label>
                <button class="btn btn-default">
                  <i class="fa fa-heart" aria-hidden="true"></i>
                  Add to favorite
                </button>

                <div class="star-rating">
                  {movieDetail && (
                    <StarRating vote_average={movieDetail.vote_average / 2} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Cast</h2>
        <Slider {...settings}>
          {movieCast.map((cast) => (
            <div key={cast.id} >
              <Card sx={{ maxWidth: 345,height: "300px", overflow: "hidden", marginRight: "20px", }} 
              style={{marginRight:"20px", justifyContent:"space-between"}}>
                <CardActionArea>
                  <CardMedia component="img" height="190" image={cast.profile_path} alt={cast.name} />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">{cast.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{cast.character}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieDetail;