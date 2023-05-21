import React, { useState } from 'react';
import classes from './Poster.module.css';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import demoPoster from '../assets/demoPoster.jpg';
import { useEffect } from 'react';
import Loader from './Loader';

const IMG_PATH = 'https://image.tmdb.org/t/p/original';

const ShowPoster = ({
  home,
  shows,
  title,
  similar,
  path,
  setPage,
  page,
  search,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, [shows?.results]);

  const showsToUse = (
    home ? shows?.results?.slice(0, 5) : shows?.results
  ).filter(show => show?.backdrop_path !== null || show?.poster_path !== null);

  if (isLoading) return <Loader />;

  if (!showsToUse || showsToUse?.length < 1)
    return <p>No similar shows available at this time</p>;

  const handlePagination = direction => {
    if (direction === 'next' && shows.total_pages > page) {
      return setPage(page => (page += 1));
    } else if (page > 1) setPage(page => (page -= 1));
  };

  return (
    <div className={classes.posters}>
      {!similar && !search && title && (
        <h2>
          <span style={{ color: '#eb1c24' }}>{title}</span> Shows:
        </h2>
      )}
      <div className={classes.posterContainer}>
        {showsToUse?.map((show, idx) => (
          <div key={idx} className={classes.poster}>
            <img
              src={
                show?.poster_path
                  ? `${IMG_PATH}/${show?.poster_path}`
                  : demoPoster
              }
              alt={show?.name}
              loading="lazy"
            />
            <h4>{show?.name}</h4>
            <p>
              {show?.first_air_date
                ? new Date(show?.first_air_date).getFullYear()
                : 'Unknown'}
              {show?.last_air_date &&
                new Date(show?.last_air_date).getFullYear()}
            </p>
            <div className={classes.details}>
              <span>
                <StarIcon sx={{ mr: 0.3, color: '#FFD700', fontSize: 25 }} />
                {show?.vote_average.toFixed(1)}
              </span>
              <Link to={`/show/${show?.id}`}>View Details</Link>
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
            disabled={page > 9 || shows.total_pages < page + 1}
            onClick={() => handlePagination('next')}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowPoster;
