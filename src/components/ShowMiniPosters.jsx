import React from 'react';
import classes from './Poster.module.css';
const IMG_PATH = 'https://image.tmdb.org/t/p/original';
import { Link, useParams } from 'react-router-dom';
import demoPoster from '../assets/demoPoster.jpg';

const ShowMiniPosters = ({ seasons, id }) => {
  if (!seasons || seasons?.length < 1) return <p>No seasons available</p>;
  // console.log(seasons);

  const params = useParams();
  const seasonActive = params?.seasonNumber;

  const selectedClasses = `${classes.poster} ${classes.selected}`;

  return (
    <div className={classes.posters}>
      <h2>
        <span style={{ color: '#eb1c24' }}>All</span> Seasons:
      </h2>

      <div className={classes.posterContainer}>
        {seasons?.map(season => (
          <div
            key={season?.id}
            className={
              +seasonActive !== season?.season_number
                ? classes.poster
                : selectedClasses
            }
          >
            <img
              src={
                season?.poster_path
                  ? `${IMG_PATH}/${season?.poster_path}`
                  : demoPoster
              }
              alt={season?.name}
              loading="lazy"
            ></img>
            <h4>
              {season?.name} ({season?.episode_count} Episodes)
            </h4>
            <p>
              {season?.air_date
                ? new Date(season?.air_date).getFullYear()
                : 'Unknown'}
            </p>
            <div className={classes.miniDetails}>
              <Link to={`/show/${id}/${season?.season_number}`}>
                Show Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowMiniPosters;
