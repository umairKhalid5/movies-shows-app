import React, { useEffect, useRef, useState } from 'react';
import {
  useGetMovieCreditsQuery,
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

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const MovieDetails = ({ timeFormatter }) => {
  const [trailer, setTrailer] = useState(false);

  const params = useParams();
  const { data: singleMovie, isFetching: fetchingMovie } = useGetMovieQuery(
    params.movieId
  );

  const trailerRef = useRef();

  const { data: movieCredits, isFetching: fetchingCast } =
    useGetMovieCreditsQuery(params.movieId);

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

  if (fetchingMovie || fetchingVideos || fetchingCast || fetchingSimilar)
    return <Loader />;
  // console.log(singleMovie);
  // console.log('videos', videos);

  const movieTrailer1 = videos?.results?.filter(
    video => video.name === 'Official Trailer'
  );
  const movieTrailer2 = videos?.results?.filter(video =>
    video.name.includes('Trailer')
  );

  // console.log('movieCredits', movieCredits);
  const director = movieCredits?.crew?.filter(
    role => role.department === 'Directing' && role.job === 'Director'
  )[0]?.name;
  // console.log(director);

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
  const releaseDate = new Intl.DateTimeFormat('en-US', options).format(
    new Date(singleMovie?.release_date)
  );

  const isReleased = new Date() - new Date(singleMovie?.release_date) > 0;
  const budget = singleMovie?.budget
    ? `$${millify(singleMovie?.budget, { precision: 3 })}`
    : 'Unavailable';
  const revenue = isReleased
    ? `$${millify(singleMovie?.revenue, { precision: 3 })}`
    : 'Not yet Released';

  return (
    <div className={classes.mainContainer}>
      <div className={classes.imageContainer}>
        {/* //? Backdrop */}
        <div className={classes.backdrop}>
          <img
            src={
              singleMovie?.backdrop_path
                ? `${IMG_PATH}/${singleMovie?.backdrop_path}`
                : demoBackdrop
            }
            alt={singleMovie?.title}
            loading="lazy"
          />
        </div>

        {/* //? Poster */}
        <div className={classes?.posterContainer}>
          <img
            src={
              singleMovie?.poster_path
                ? `${IMG_PATH}/${singleMovie?.poster_path}`
                : demoPoster
            }
            alt={singleMovie?.original_title}
            loading="lazy"
          />
        </div>

        {/* //? Details on the right */}
        <div className={classes.detailsContainer}>
          <div className={classes.card}>
            <h1 className={classes.tagline}>
              {singleMovie?.tagline?.slice(0, -1)}
            </h1>
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
              <button
                onClick={() => window.open(singleMovie?.homepage)}
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
      {/* //? Cast & Crew */}
      <Credits credits={movieCredits} />

      {/* //? Similar Movies */}
      <SimilarMovies videos={similarMovies} category="Movies" />
    </div>
  );
};

export default MovieDetails;
