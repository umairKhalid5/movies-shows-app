import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetEpisodesQuery, useGetShowQuery } from '../services/getMoviesApi';
import classes from './SeasonDetails.module.css';
import demoBackdrop from '../assets/demoBackdrop.jpg';
import StarIcon from '@mui/icons-material/Star';
import Loader from './Loader';
import ShowMiniPosters from './ShowMiniPosters';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SeasonDetails = ({ timeFormatter }) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const params = useParams();
  const { showId, seasonNumber } = params;

  const { data: singleShow, isFetching: fetchingShow } =
    useGetShowQuery(showId);

  const { data: seasonDetails, isFetching } = useGetEpisodesQuery({
    showId,
    seasonNumber,
  });

  // if (fetchingShow || isFetching) return <Loader />;
  // console.log(singleShow, seasonDetails);

  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const dateFormatter = date => {
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  };

  return (
    <div className={classes.container}>
      {fetchingShow ? (
        <Loader />
      ) : (
        <div className={classes.singlePoster}>
          <div className={classes.imageContainer}>
            <img
              src={
                singleShow?.poster_path
                  ? `${IMG_PATH}/${singleShow?.poster_path}`
                  : demoPoster
              }
              alt={singleShow?.name}
              loading="lazy"
            />
          </div>
          <div className={classes.details}>
            <Link to={`/show/${singleShow?.id}`}>
              <p>{singleShow?.name}</p>
            </Link>
            <span>
              (
              {singleShow?.first_air_date
                ? new Date(singleShow?.first_air_date).getFullYear()
                : 'Unknown'}
              -
              {singleShow?.last_air_date &&
                new Date(singleShow?.last_air_date).getFullYear()}
              )
            </span>
            <p>Episodes List</p>
          </div>
        </div>
      )}
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <h2>Season {seasonDetails?.season_number}</h2>
          {seasonDetails?.episodes.map(episode => (
            <div key={episode?.id} className={classes.episode}>
              <div className={classes.still}>
                <img
                  src={
                    episode?.still_path
                      ? `${IMG_PATH}/${episode?.still_path}`
                      : demoBackdrop
                  }
                  alt={episode?.name}
                  loading="lazy"
                />
                <div className={classes.count}>
                  S{episode?.season_number}, Ep{episode?.episode_number}&nbsp; •
                  &nbsp;
                  {timeFormatter(episode?.runtime)}
                </div>
              </div>

              <div className={classes.details}>
                <h4>
                  {episode?.name}{' '}
                  <span>{dateFormatter(episode?.air_date)}</span>
                </h4>
                <div className={classes.ratings}>
                  <StarIcon sx={{ mr: 0.5, color: '#FFD700', fontSize: 22 }} />{' '}
                  {episode?.vote_average?.toFixed(1)} ({episode?.vote_count})
                </div>
                <div className={classes.desc}>{episode?.overview}</div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* //? All Seasons Posters */}
      {fetchingShow ? (
        <Loader />
      ) : (
        <ShowMiniPosters seasons={singleShow?.seasons} id={singleShow?.id} />
      )}
    </div>
  );
};

export default SeasonDetails;