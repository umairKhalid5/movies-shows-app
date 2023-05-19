import React from 'react';
import { useGetPersonQuery } from '../services/getMoviesApi';
import { useParams } from 'react-router-dom';
import classes from './ActorDetails.module.css';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
import demoPoster from '../assets/demoPoster.jpg';

const ActorDetails = () => {
  const params = useParams();
  const { data, isFetching } = useGetPersonQuery(params.id);
  if (isFetching) return;
  console.log(data);

  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <img
          src={
            data?.profile_path
              ? `${IMG_PATH}/${data?.profile_path}`
              : demoPoster
          }
        />
      </div>

      <div className={classes.info}>
        <h4>{data?.name}</h4>
        <span>{data?.known_for_department}</span>
        <span>Birth: {data?.birthday}</span>
        {data?.deathday && <span>Death: {data?.deathday}</span>}
        <p className={classes.bio}>{data?.biography}</p>
        <button
          onClick={() =>
            window.open(`https://www.imdb.com/name/${data?.imdb_id}/`)
          }
        >
          IMDB Profile
        </button>
      </div>
    </div>
  );
};

export default ActorDetails;
