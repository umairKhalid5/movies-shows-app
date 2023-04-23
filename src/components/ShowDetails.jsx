import React, { useEffect, useRef, useState } from 'react';
import {
  useGetShowCreditsQuery,
  useGetShowQuery,
  useGetShowVideosQuery,
  useGetSimilarShowsQuery,
} from '../services/getMoviesApi';
import { useParams } from 'react-router-dom';
import classes from './Details.module.css';
import StarIcon from '@mui/icons-material/Star';
import ReactPlayer from 'react-player';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LanguageIcon from '@mui/icons-material/Language';
import Credits from './Credits';
import SimilarMovies from './SimilarMovies';
import demoBackdrop from '../assets/demoBackdrop.jpg';
import demoPoster from '../assets/demoPoster.jpg';
import Loader from './Loader';
import ShowMiniPosters from './ShowMiniPosters';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const dateFormatter = date => {
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    new Date(date)
  );
  return formattedDate;
};

const ShowDetails = ({ timeFormatter }) => {
  const [trailer, setTrailer] = useState(false);
  const trailerRef = useRef();

  const params = useParams();
  const { data: singleShow, isFetching: fetchingShow } = useGetShowQuery(
    params.showId
  );

  const { data: showCredits, isFetching: fetchingCast } =
    useGetShowCreditsQuery(params.showId);

  const { data: similarShows, isFetching: fetchingSimilar } =
    useGetSimilarShowsQuery(params.showId);

  const { data: videos, isFetching: fetchingVideos } = useGetShowVideosQuery(
    params.showId
  );

  useEffect(() => {
    if (trailer)
      trailerRef.current.scrollIntoView({
        behavior: 'smooth',
      });
  }, [trailer]);

  if (fetchingShow || fetchingCast || fetchingSimilar || fetchingVideos)
    return <Loader />;

  // console.log(singleShow);

  const showTrailer1 = videos?.results?.filter(
    video => video.name === 'Official Trailer'
  );
  const showTrailer2 = videos?.results?.filter(video =>
    video.name.includes('Trailer')
  );

  const videoIsAvailable = !!(
    showTrailer1[0]?.key ||
    showTrailer2[0]?.key ||
    videos?.results[0]?.key
  );
  const youTubeURL =
    videoIsAvailable &&
    `https://www.youtube.com/watch?v=${
      showTrailer1[0]?.key || showTrailer2[0]?.key || videos?.results[0]?.key
    }`;

  const genres = singleShow?.genres?.map(show => show?.name).join(', ');
  const firstAirDate = dateFormatter(singleShow?.first_air_date);
  const lastAirDate = dateFormatter(singleShow?.last_air_date);

  const totalSeasons = singleShow?.number_of_seasons || 'Unavailable';
  const totalEpisodes = singleShow?.number_of_episodes || 'Not yet Released';

  return (
    <div className={classes.mainContainer}>
      <div className={classes.imageContainer}>
        {/* //? Backdrop */}
        <div className={classes.backdrop}>
          <img
            src={
              singleShow?.backdrop_path
                ? `${IMG_PATH}/${singleShow?.backdrop_path}`
                : demoBackdrop
            }
            alt={singleShow?.name}
            loading="lazy"
          />
        </div>

        {/* //? Poster */}
        <div className={classes?.posterContainer}>
          <img
            src={
              singleShow?.poster_path
                ? `${IMG_PATH}/${singleShow?.poster_path}`
                : demoPoster
            }
            alt={singleShow?.original_name}
            loading="lazy"
          />
        </div>

        {/* //? Details on the right */}
        <div className={classes.detailsContainer}>
          <div className={classes.card}>
            <h1 className={classes.tagline}>{singleShow?.tagline}</h1>
            <h2 className={classes.title}>{singleShow?.name}</h2>
            <span className={classes.details}>
              <StarIcon sx={{ mr: 0.5, color: '#FFD700' }} />
              <p>
                {singleShow?.vote_average?.toFixed(1)}
                <span className={classes.totalVotes}>
                  {' '}
                  | {singleShow?.vote_count}{' '}
                </span>
              </p>

              <span className={classes.genre}>
                •<div>{timeFormatter(singleShow?.episode_run_time[0])}</div>•
                <div>{genres}</div>•
                <div>
                  <strong>{firstAirDate}</strong>
                </div>
                -
                <div>
                  <strong>{lastAirDate}</strong>
                </div>
                {/* • <div>{singleShow?.networks[0]?.name}</div> */}
              </span>
            </span>
            <p className={classes.desc}>{singleShow?.overview}</p>
          </div>

          {/* //? Number of seasons & episodes */}
          <div className={classes.bottomHalf}>
            <div className={classes.finances}>
              <p>
                <span>Total Seasons: </span>
                {totalSeasons}
              </p>
              <p>
                <span>Total Episodes: </span>
                {totalEpisodes}
              </p>
              <p>
                <span>Director: </span>
                {singleShow?.created_by[0]?.name}
              </p>
              <p>
                <span>Network: </span>
                {singleShow?.networks[0]?.name}
              </p>
            </div>
            <div className={classes.actions}>
              {videoIsAvailable && (
                <button
                  onClick={() => setTrailer(true)}
                  className={!trailer ? 'bounce' : ''}
                >
                  <PlayCircleOutlineIcon sx={{ color: '#fff', mr: 1 }} />
                  Watch Trailer
                </button>
              )}
              <button
                onClick={() => window.open(singleShow?.homepage)}
                value="_blank"
              >
                <LanguageIcon sx={{ color: '#fff', mr: 1 }} />
                Visit Homepage
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* //?Trailer */}
      {trailer && (
        <div
          className={classes.videoSection}
          ref={trailerRef}
          onClick={() => setTrailer(false)}
        >
          <div className={classes.videoContainer}>
            {/* <h2>Trailer: </h2> */}
            <ReactPlayer url={youTubeURL} className="react-player" controls />
          </div>
          <button onClick={() => setTrailer(false)}>X</button>
        </div>
      )}

      {/* //? All Seasons Posters */}
      <ShowMiniPosters seasons={singleShow?.seasons} id={singleShow?.id} />

      {/* //? Cast & Crew */}
      <Credits credits={showCredits} />

      {/* //? Similar Movies */}
      <SimilarMovies videos={similarShows} category="Shows" />
    </div>
  );
};

export default ShowDetails;
