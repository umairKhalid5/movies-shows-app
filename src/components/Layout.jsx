import React, { useState } from 'react';
import MovieDetails from './MovieDetails';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import MoviePoster from './MoviePoster';
import {
  useGetPopularMoviesQuery,
  useGetPopularShowsQuery,
  useGetTopRatedMoviesQuery,
  useGetTopRatedTvShowsQuery,
  useGetUpcomingMoviesQuery,
} from '../services/getMoviesApi';
import ScrollToTopArrow from './ScrollToTopArrow';
import SearchFeed from './SearchFeed';
import Loader from './Loader';
import About from './About';
import ShowPoster from './ShowPoster';
import ShowDetails from './ShowDetails';
import SeasonDetails from './SeasonDetails';
import NotFound from './NotFound';

const timeFormatter = minutes => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours > 0 ? hours + 'h' : ''} ${mins > 0 ? mins + 'm' : ''}`;
};

const Layout = () => {
  const [popularPage, setPopularPage] = useState(1);
  const [topRatedPage, setTopRatedPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [topRatedTvPage, setTopRatedTvPage] = useState(1);
  const [popularPageTv, setPopularPageTv] = useState(1);

  const { data: topRatedMovies, isFetching: fetchingTopRated } =
    useGetTopRatedMoviesQuery(topRatedPage);
  const { data: upcomingMovies, isFetching: fetchingUpcoming } =
    useGetUpcomingMoviesQuery(upcomingPage);
  const { data: popularMovies, isFetching: fetchingPopular } =
    useGetPopularMoviesQuery(popularPage);
  const { data: topRatedTv, isFetching: fetchingTopRatedTv } =
    useGetTopRatedTvShowsQuery(topRatedTvPage);
  const { data: popularShows, isFetching: fetchingPopularTv } =
    useGetPopularShowsQuery(popularPageTv);

  if (
    fetchingTopRated ||
    fetchingUpcoming ||
    fetchingPopular ||
    fetchingTopRatedTv ||
    fetchingPopularTv
  )
    return <Loader />;

  return (
    <div className="main">
      <Routes>
        <Route path="" element={<Home timeFormatter={timeFormatter} />} />
        <Route
          path="/movie/:movieId"
          element={<MovieDetails timeFormatter={timeFormatter} />}
        />
        <Route
          path="/topRatedMovies"
          element={
            <MoviePoster
              title="Top Rated"
              movies={topRatedMovies}
              page={topRatedPage}
              setPage={setTopRatedPage}
            />
          }
        />
        <Route
          path="/upcomingMovies"
          element={
            <MoviePoster
              title="Upcoming"
              movies={upcomingMovies}
              page={upcomingPage}
              setPage={setUpcomingPage}
            />
          }
        />
        <Route
          path="/popularMovies"
          element={
            <MoviePoster
              title="Popular"
              movies={popularMovies}
              page={popularPage}
              setPage={setPopularPage}
            />
          }
        />

        {/* //? TV SHOWS */}
        <Route
          path="/topRatedTv"
          element={
            <ShowPoster
              title="Top Rated"
              shows={topRatedTv}
              page={topRatedTvPage}
              setPage={setTopRatedTvPage}
            />
          }
        />
        <Route
          path="/popularTv"
          element={
            <ShowPoster
              title="Popular"
              shows={popularShows}
              page={popularPageTv}
              setPage={setPopularPageTv}
            />
          }
        />

        <Route
          path="/show/:showId"
          element={<ShowDetails timeFormatter={timeFormatter} />}
        />
        <Route
          path="/show/:showId"
          element={<ShowDetails timeFormatter={timeFormatter} />}
        />
        <Route
          path="/show/:showId/:seasonNumber"
          element={<SeasonDetails timeFormatter={timeFormatter} />}
        />
        <Route path="/search/:search" element={<SearchFeed />} />
        <Route path="/about" element={<About />} />

        {/* <Route path="*" element={<Navigate replace to="" />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTopArrow />
    </div>
  );
};

export default Layout;
