import React from 'react';
import classes from './Credits.module.css';
const IMG_PATH = 'https://image.tmdb.org/t/p/original';
import demoProfilePic from '../assets/profilePic.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetMovieCreditsQuery } from '../services/getMoviesApi';
import Loader from './Loader';

const Credits = ({ short }) => {
  const navigate = useNavigate();

  const params = useParams();

  const { data: movieCredits, isFetching: fetchingCast } =
    useGetMovieCreditsQuery(params.movieId);

  if (fetchingCast) return <Loader />;

  const creditsToUse = short
    ? movieCredits?.cast?.slice(0, 5)
    : movieCredits?.cast;

  const handleClick = id => navigate(`/person/${id}`);

  const classesToUse = short
    ? classes.creditsContainer
    : `${classes.creditsContainer} ${classes.full}`;

  return (
    <>
      <div className={classesToUse}>
        <h2>Cast:</h2>
        <ul>
          {creditsToUse?.map(member => (
            <li key={member?.id} onClick={() => handleClick(member?.id)}>
              <img
                src={
                  member?.profile_path
                    ? `${IMG_PATH}${member?.profile_path}`
                    : demoProfilePic
                }
              />
              {member?.name}
            </li>
          ))}
          {short && (
            <li className={classes.moreBtn}>
              <Link to={`credits`} className={classes.creditsBtn}>
                See More
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Credits;
