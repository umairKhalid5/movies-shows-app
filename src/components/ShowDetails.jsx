import React, { useEffect, useRef, useState } from 'react';
import {
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
import { CSSTransition } from 'react-transition-group';
import { motion } from 'framer-motion';
import Image from './UI/Image.jsx';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const ShowDetails = ({ timeFormatter }) => {
  const [trailer, setTrailer] = useState(false);
  const trailerRef = useRef();

  const params = useParams();
  const { data: singleShow, isFetching: fetchingShow } = useGetShowQuery(
    params.showId
  );

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

  if (fetchingShow || fetchingSimilar || fetchingVideos) return <Loader />;

  // console.log(singleShow);

  const tagline = singleShow?.tagline;
  const taglineToUse =
    tagline[tagline.length - 1] === '.' ? tagline?.slice(0, -1) : tagline;

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
  const firstAirDate = new Date(singleShow?.first_air_date).getFullYear();
  const lastAirDate = new Date(singleShow?.last_air_date).getFullYear();

  const totalSeasons = singleShow?.number_of_seasons || 'Unavailable';
  const totalEpisodes = singleShow?.number_of_episodes || 'Not yet Released';

  return (
    <motion.div
      className={classes.mainContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className={classes.imageContainer}>
        {/* //? Backdrop */}
        <div className={classes.backdrop}>
          {/* <img
            src={
              singleShow?.backdrop_path
                ? `${IMG_PATH}/${singleShow?.backdrop_path}`
                : demoBackdrop
            }
            alt={singleShow?.name}
            loading="lazy"
          /> */}
          <Image
            src={
              singleShow?.backdrop_path
                ? `${IMG_PATH}/${singleShow?.backdrop_path}`
                : demoBackdrop
            }
            alt={singleShow?.name}
          />
        </div>

        {/* //? Poster */}
        <div className={classes?.posterContainer}>
          {/* <img
            src={
              singleShow?.poster_path
                ? `${IMG_PATH}/${singleShow?.poster_path}`
                : demoPoster
            }
            alt={singleShow?.original_name}
            loading="lazy"
          /> */}
          <Image
            src={
              singleShow?.poster_path
                ? `${IMG_PATH}/${singleShow?.poster_path}`
                : demoPoster
            }
            alt={singleShow?.original_name}
          />
        </div>

        {/* //? Details on the right */}
        <div className={classes.detailsContainer}>
          <div className={classes.card}>
            <h1 className={classes.tagline}>{taglineToUse}</h1>
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
                  <strong>
                    {firstAirDate} - {lastAirDate}
                  </strong>
                </div>
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
      <CSSTransition
        in={trailer}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 1000, exit: 500 }}
        classNames={{
          enter: '',
          enterActive: 'navSlide show',
          exit: '',
          exitActive: 'navSlide hide',
        }}
      >
        <div
          className={classes.videoSection}
          ref={trailerRef}
          onClick={() => setTrailer(false)}
        >
          <div className={classes.videoContainer}>
            <ReactPlayer url={youTubeURL} className="react-player" controls />
          </div>
          <button onClick={() => setTrailer(false)}>X</button>
        </div>
      </CSSTransition>

      {/* //? All Seasons Posters */}
      <ShowMiniPosters seasons={singleShow?.seasons} id={singleShow?.id} />

      {/* //? Cast & Crew */}
      <Credits show short />

      {/* //? Similar Movies */}
      <SimilarMovies videos={similarShows} category="Shows" />
    </motion.div>
  );
};

export default ShowDetails;
