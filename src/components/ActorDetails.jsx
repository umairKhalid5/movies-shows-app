import React from 'react';
import {
  useGetPersonCreditsQuery,
  useGetPersonQuery,
} from '../services/getMoviesApi';
import { useParams } from 'react-router-dom';
import classes from './ActorDetails.module.css';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
import demoPoster from '../assets/demoPoster.jpg';
import ShowPoster from './ShowPoster';
import MoviePoster from './MoviePoster';
import { motion } from 'framer-motion';

const ActorDetails = () => {
  const params = useParams();
  const { data: actorData, isFetching: fetchingActorData } = useGetPersonQuery(
    params.id
  );
  const { data: actorCredits, isFetching: fetchingActorCredits } =
    useGetPersonCreditsQuery(params.id);
  if (fetchingActorData || fetchingActorCredits) return;
  // console.log(actorCredits);

  const actorTopMovies = actorCredits?.cast?.filter(
    movie => movie.popularity > 20
  );

  const fields = {
    Acting: 'Actor',
    Directing: 'Director',
    Sound: 'Music',
  };

  const movies = actorTopMovies
    ?.filter(video => video.media_type === 'movie')
    ?.sort((a, b) => b.vote_average - a.vote_average);

  const shows = actorTopMovies
    ?.filter(video => video.media_type === 'tv')
    .sort((a, b) => b.vote_average - a.vote_average);

  // console.log(shows);

  const moviesDisplays = movies.length > 0 && (
    <MoviePoster movies={{ results: movies }} />
  );

  const showsDisplays = shows.length > 0 && (
    <ShowPoster title shows={{ results: shows }} />
  );

  return (
    <motion.div
      className={classes.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className={classes.wrapper}>
        <div className={classes.image}>
          <img
            src={
              actorData?.profile_path
                ? `${IMG_PATH}/${actorData?.profile_path}`
                : demoPoster
            }
          />
        </div>

        <div>
          <h3>
            {actorData?.name}
            <span>
              <span>({new Date(actorData?.birthday).getFullYear()}-</span>
              {
                <span>
                  {actorData?.deathday
                    ? new Date(actorData?.deathday).getFullYear()
                    : 'Present'}
                  )
                </span>
              }
            </span>
          </h3>
          <span className={classes.field}>
            {fields[actorData?.known_for_department]}
          </span>
          <button
            onClick={() =>
              window.open(`https://www.imdb.com/name/${actorData?.imdb_id}/`)
            }
          >
            IMDB Profile
          </button>
        </div>
      </div>
      <div className={classes.info}>
        <p className={classes.bio}>{actorData?.biography}</p>
      </div>
      {moviesDisplays}
      {showsDisplays}
    </motion.div>
  );
};

export default ActorDetails;
