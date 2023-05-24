import React from 'react';
import classes from './MovieCard.module.css';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import demoBackdrop from '../assets/demoBackdrop.jpg';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const MovieCard = ({ movie, details }) => {
  const genres = movie?.genres?.map(movie => movie?.name).join(', ');

  const genreBoxClasses = details
    ? `${classes.genre} ${classes.detailsPage}`
    : classes.genre;

  return (
    <div className={classes.card}>
      <div className={classes['card-top']}>
        <img
          src={
            movie?.backdrop_path
              ? `${IMG_PATH}/${movie?.backdrop_path}`
              : demoBackdrop
          }
          alt={movie.name}
          loading="lazy"
        />
      </div>
      <div className={classes['card-bottom']}>
        <div className={classes.cardBottomLeft}>
          <h2>{movie.original_title}</h2>
          <span className={classes.details}>
            <StarIcon sx={{ mr: 0.5, color: '#FFD700' }} />
            <p>
              {movie?.vote_average?.toFixed(1)}
              <span className={classes.totalVotes}> | {movie.vote_count} </span>
            </p>
            <span className={genreBoxClasses}>
              •<div>{new Date(movie.release_date).getFullYear()}</div>
            </span>
          </span>
          <p className={classes.desc}>{movie.overview}</p>
        </div>

        <div className={classes.cardBottomRight}>
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <button>See Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
