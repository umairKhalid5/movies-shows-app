import React, { useState } from 'react';
import classes from './Poster.module.css';
const IMG_PATH = 'https://image.tmdb.org/t/p/original';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import demoPoster from '../assets/demoPoster.jpg';
import { useEffect } from 'react';
import Loader from './Loader';

const MoviePoster = ({
  home,
  movies,
  title,
  similar,
  path,
  setPage,
  page,
  search,
}) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, [movies?.results]);

  const moviesToUse = (
    home ? movies?.results?.slice(0, 5) : movies?.results
  ).filter(
    movie => movie?.backdrop_path !== null || movie?.poster_path !== null
  );

  if (isLoading) return <Loader />;

  if (!moviesToUse || moviesToUse?.length < 1)
    return <p>No similar movies available at this time for this movie</p>;

  const handlePagination = direction => {
    if (direction === 'next' && movies.total_pages > page) {
      return setPage(page => (page += 1));
    } else if (page > 1) setPage(page => (page -= 1));
  };

  return (
    <div className={classes.posters}>
      {!similar && !search && (
        <h2>
          <span style={{ color: '#eb1c24' }}>{title}</span> Movies:
        </h2>
      )}
      <div className={classes.posterContainer}>
        {moviesToUse?.map((movie, idx) => (
          <div key={idx} className={classes.poster}>
            <img
              src={
                movie?.poster_path
                  ? `${IMG_PATH}/${movie?.poster_path}`
                  : demoPoster
              }
              alt={movie?.title}
              loading="lazy"
            ></img>
            <h4>{movie?.title}</h4>
            <p>
              {movie?.release_date
                ? new Date(movie?.release_date).getFullYear()
                : 'Unknown'}
            </p>
            <div className={classes.details}>
              <span>
                <StarIcon sx={{ mr: 0.3, color: '#FFD700', fontSize: 25 }} />
                {movie?.vote_average.toFixed(1)}
              </span>
              <Link to={`/movie/${movie?.id}`}>View Details</Link>
            </div>
          </div>
        ))}
        {home && !similar && (
          <div className={`${classes.poster} ${classes.more}`}>
            <Link to={path}>More..</Link>
          </div>
        )}
      </div>
      {!home && !similar && page && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(1)}>
            Page 1
          </button>
          <button disabled={page <= 1} onClick={() => handlePagination('prev')}>
            Prev
          </button>
          <button
            disabled={page > 5 || movies.total_pages < page + 1}
            onClick={() => handlePagination('next')}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviePoster;
