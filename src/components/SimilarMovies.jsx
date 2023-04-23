import React from 'react';
import classes from './SimilarMovies.module.css';
import MoviePoster from './MoviePoster';
import ShowPoster from './ShowPoster';

const SimilarMovies = ({ videos, category }) => {
  return (
    <div className={classes.container}>
      <h2>Similar {category}:</h2>
      {category === 'Movies' && (
        <MoviePoster movies={videos} title="Similar" similar />
      )}
      {category === 'Shows' && (
        <ShowPoster shows={videos} title="Similar" similar />
      )}
    </div>
  );
};

export default SimilarMovies;
