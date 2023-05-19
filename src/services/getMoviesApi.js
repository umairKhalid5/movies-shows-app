import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const key = '8d1bb757e88e9795281c3db78882b9b0';
const key = import.meta.env.VITE_MOVIE_API_KEY;

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: builder => ({
    getPopularMovies: builder.query({
      query: page =>
        `discover/movie?sort_by=popularity.desc&api_key=${key}&page=${page}`,
    }),
    getMovie: builder.query({
      query: id => `movie/${id}?api_key=${key}&language=en-US`,
    }),
    getMovieVideos: builder.query({
      query: id => `movie/${id}/videos?api_key=${key}&language=en-US`,
    }),
    getMovieCredits: builder.query({
      query: id => `movie/${id}/credits?api_key=${key}&language=en-US`,
    }),
    getMovieReviews: builder.query({
      query: id => `movie/${id}/reviews?api_key=${key}&language=en-US&page=1`,
    }),
    getTopRatedMovies: builder.query({
      query: page =>
        `movie/top_rated?api_key=${key}&language=en-US&page=${page}`,
    }),
    getSimilarMovies: builder.query({
      query: id => `movie/${id}/similar?api_key=${key}&language=en-US`,
    }),
    getUpcomingMovies: builder.query({
      query: page =>
        `movie/upcoming?api_key=${key}&language=en-US&page=${page}`,
    }),
    getTopRatedTvShows: builder.query({
      query: page => `tv/top_rated?api_key=${key}&language=en-US&page=${page}`,
    }),
    getShow: builder.query({
      query: id => `tv/${id}?api_key=${key}&language=en-US`,
    }),
    getShowCredits: builder.query({
      query: id => `tv/${id}/credits?api_key=${key}&language=en-US`,
    }),
    getSimilarShows: builder.query({
      query: id => `tv/${id}/similar?api_key=${key}&language=en-US&page=1`,
    }),
    getShowVideos: builder.query({
      query: id => `tv/${id}/videos?api_key=${key}&language=en-US`,
    }),
    getPopularShows: builder.query({
      query: page =>
        `discover/tv?sort_by=popularity.desc&api_key=${key}&page=${page}&with_original_language=en`,
    }),
    getSearchVideos: builder.query({
      query: data =>
        `search/multi?api_key=${key}&language=en-US&query=${data.searchTerm}&page=${data.page}`,
    }),
    getEpisodes: builder.query({
      query: ({ showId, seasonNumber }) =>
        `tv/${showId}/season/${seasonNumber}?api_key=${key}&language=en-US`,
    }),
    getPerson: builder.query({
      query: id => `person/${id}?api_key=${key}&language=en-US`,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetMovieQuery,
  useGetMovieVideosQuery,
  useGetMovieCreditsQuery,
  useGetMovieReviewsQuery,
  useGetTopRatedMoviesQuery,
  useGetSimilarMoviesQuery,
  useGetUpcomingMoviesQuery,
  // useGetSearchMovieQuery,
  useGetTopRatedTvShowsQuery,
  useGetShowQuery,
  useGetShowCreditsQuery,
  useGetSimilarShowsQuery,
  useGetShowVideosQuery,
  useGetPopularShowsQuery,
  useGetSearchVideosQuery,
  useGetEpisodesQuery,
  useGetPersonQuery,
} = moviesApi;
