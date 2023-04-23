import React from 'react';
import classes from './Credits.module.css';
const IMG_PATH = 'https://image.tmdb.org/t/p/original';
import demoProfilePic from '../assets/profilePic.png';

const Credits = ({ credits }) => {
  return (
    <>
      <div className={classes.creditsContainer}>
        <h2>Cast:</h2>
        <ul>
          {credits?.cast.map(member => (
            <li key={member?.id}>
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
        </ul>
      </div>
    </>
  );
};

export default Credits;
