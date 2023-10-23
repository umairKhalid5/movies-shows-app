import React, { useEffect, useRef, useState } from 'react';
import {
  useGetMovieQuery,
  useGetMovieVideosQuery,
  useGetSimilarMoviesQuery,
} from '../services/getMoviesApi';
import { useParams } from 'react-router-dom';
import classes from './Details.module.css';
import StarIcon from '@mui/icons-material/Star';
import ReactPlayer from 'react-player';
import millify from 'millify';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LanguageIcon from '@mui/icons-material/Language';
import Credits from './Credits';
import SimilarMovies from './SimilarMovies';
import demoBackdrop from '../assets/demoBackdrop.jpg';
import demoPoster from '../assets/demoPoster.jpg';
import Loader from './Loader';
import { CSSTransition } from 'react-transition-group';
import { motion } from 'framer-motion';
import Image from './UI/Image.jsx';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const MovieDetails = ({ timeFormatter }) => {
  const [trailer, setTrailer] = useState(false);

  const params = useParams();
  const { data: singleMovie, isFetching: fetchingMovie } = useGetMovieQuery(
    params.movieId
  );

  const trailerRef = useRef();

  const { data: videos, isFetching: fetchingVideos } = useGetMovieVideosQuery(
    params.movieId
  );

  const { data: similarMovies, isFetching: fetchingSimilar } =
    useGetSimilarMoviesQuery(params.movieId);

  useEffect(() => {
    if (trailer)
      trailerRef.current.scrollIntoView({
        behavior: 'smooth',
      });
  }, [trailer]);

  if (fetchingMovie || fetchingVideos || fetchingSimilar) return <Loader />;

  const tagline = singleMovie?.tagline;
  const taglineToUse =
    tagline[tagline.length - 1] === '.' ? tagline?.slice(0, -1) : tagline;

  const movieTrailer1 = videos?.results?.filter(
    video => video.name === 'Official Trailer'
  );
  const movieTrailer2 = videos?.results?.filter(video =>
    video.name.includes('Trailer')
  );

  const director = singleMovie?.credits?.crew?.filter(
    role => role.department === 'Directing' && role.job === 'Director'
  )[0]?.name;

  const videoIsAvailable = !!(
    movieTrailer1[0]?.key ||
    movieTrailer2[0]?.key ||
    videos?.results[0]?.key
  );
  const youTubeURL =
    videoIsAvailable &&
    `https://www.youtube.com/watch?v=${
      movieTrailer1[0]?.key || movieTrailer2[0]?.key || videos?.results[0]?.key
    }`;
  // console.log(youTubeURL);

  const genres = singleMovie?.genres?.map(movie => movie?.name).join(', ');

  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const releaseDate =
    singleMovie?.release_date.trim() &&
    new Intl.DateTimeFormat('en-US', options).format(
      new Date(singleMovie?.release_date)
    );
  const isReleased =
    singleMovie?.release_date.trim() &&
    new Date() - new Date(singleMovie?.release_date) > 0;
  const budget = singleMovie?.budget
    ? `$${millify(singleMovie?.budget, { precision: 3 })}`
    : 'Unavailable';
  const revenue = isReleased
    ? `$${millify(singleMovie?.revenue, { precision: 3 })}`
    : 'Not yet Released';

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
              singleMovie?.backdrop_path
                ? `${IMG_PATH}/${singleMovie?.backdrop_path}`
                : demoBackdrop
            }
            alt={singleMovie?.title}
            loading="lazy"
          /> */}
          <Image
            src={
              singleMovie?.backdrop_path
                ? `${IMG_PATH}/${singleMovie?.backdrop_path}`
                : demoBackdrop
            }
            alt={singleMovie?.title}
          />
        </div>

        {/* //? Poster */}
        <div className={classes?.posterContainer}>
          {/* <img
            src={
              singleMovie?.poster_path
                ? `${IMG_PATH}/${singleMovie?.poster_path}`
                : demoPoster
            }
            alt={singleMovie?.original_title}
            loading="lazy"
          /> */}
          <Image
            src={
              singleMovie?.poster_path
                ? `${IMG_PATH}/${singleMovie?.poster_path}`
                : demoPoster
            }
            alt={singleMovie?.original_title}
          />
        </div>

        {/* //? Details on the right */}
        <div className={classes.detailsContainer}>
          <div className={classes.card}>
            <h1 className={classes.tagline}>{taglineToUse}</h1>
            <h2 className={classes.title}>{singleMovie?.title}</h2>
            <span className={classes.details}>
              <StarIcon sx={{ mr: 0.5, color: '#FFD700' }} />
              <p>
                {singleMovie?.vote_average?.toFixed(1)}
                <span className={classes.totalVotes}>
                  {' '}
                  | {singleMovie?.vote_count}{' '}
                </span>
              </p>
              <span className={classes.genre}>
                •<div>{timeFormatter(singleMovie?.runtime)}</div>•
                <div>{genres}</div>•
                <div>
                  <strong>{releaseDate}</strong>
                </div>
              </span>
            </span>
            <p className={classes.desc}>{singleMovie?.overview}</p>
          </div>

          {/* //? Finances and Actions */}
          <div className={classes.bottomHalf}>
            <div className={classes.finances}>
              <p>
                <span>Budget: </span>
                {budget}
              </p>
              <p>
                <span>Revenue: </span>
                {revenue}
              </p>
              <p>
                <span>Director: </span>
                {director}
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
              {singleMovie?.homepage.trim() && (
                <button
                  onClick={() => window.open(singleMovie?.homepage)}
                  // value="_blank"
                >
                  <LanguageIcon sx={{ color: '#fff', mr: 1 }} />
                  Visit Homepage
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* //?Trailer */}
      {youTubeURL && (
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
              {/* <h2>Trailer: </h2> */}
              <ReactPlayer url={youTubeURL} className="react-player" controls />
            </div>
            <button onClick={() => setTrailer(false)}>X</button>
          </div>
        </CSSTransition>
      )}
      {/* //? Cast & Crew */}
      <Credits short />

      {/* //? Similar Movies */}
      <SimilarMovies videos={similarMovies} category="Movies" />
    </motion.div>
  );
};

export default MovieDetails;
