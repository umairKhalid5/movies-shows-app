import React from 'react';
import ImageSlider from './ImageSlider';
import MoviePoster from './MoviePoster';
import {
  useGetPopularMoviesQuery,
  useGetPopularShowsQuery,
  useGetTopRatedMoviesQuery,
  useGetTopRatedTvShowsQuery,
  useGetUpcomingMoviesQuery,
} from '../services/getMoviesApi';
import ShowPoster from './ShowPoster';
import Loader from './Loader';

const Home = ({ timeFormatter }) => {
  const { data: topRated, isFetching: fetchingTopRated } =
    useGetTopRatedMoviesQuery(1);
  const { data: upcoming, isFetching: fetchingUpcoming } =
    useGetUpcomingMoviesQuery();
  const { data: popular, isFetching: fetchingPopular } =
    useGetPopularMoviesQuery(1);
  const { data: topRatedTv, isFetching: fetchingTopRatedTv } =
    useGetTopRatedTvShowsQuery(1);
  const { data: popularShows, isFetching: fetchingPopularTv } =
    useGetPopularShowsQuery(1);

  if (
    fetchingTopRated ||
    fetchingUpcoming ||
    fetchingPopular ||
    fetchingTopRatedTv ||
    fetchingPopularTv
  )
    return;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <ImageSlider timeFormatter={timeFormatter} popularMovies={popular} />

      <MoviePoster
        home
        title="Popular"
        movies={popular}
        path="/popularMovies"
      />
      <MoviePoster
        home
        title="Top Rated"
        movies={topRated}
        path="/topRatedMovies"
      />
      <MoviePoster
        home
        title="Upcoming"
        movies={upcoming}
        path="/upcomingMovies"
      />

      {/* //?Tv Shows */}
      <ShowPoster
        home
        title="Top Rated"
        shows={topRatedTv}
        path="/topRatedTv"
      />

      <ShowPoster home title="Popular" shows={popularShows} path="/popularTv" />
    </div>
  );
};

export default Home;
