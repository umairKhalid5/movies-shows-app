import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './SearchFeed.module.css';
import MoviePoster from './MoviePoster';
import { useGetSearchVideosQuery } from '../services/getMoviesApi';
import ShowPoster from './ShowPoster';

const SearchFeed = () => {
  const [searchPage, setSearchPage] = useState(1);

  const params = useParams();

  const { data: searchResults, isFetching } = useGetSearchVideosQuery({
    searchTerm: params.search,
    page: searchPage,
  });

  useEffect(() => {
    setSearchPage(1);
  }, [params.search]);

  const handlePagination = direction => {
    if (direction === 'next' && searchResults.total_pages > searchPage) {
      return setSearchPage(searchPage => (searchPage += 1));
    } else if (searchPage > 1) setSearchPage(searchPage => (searchPage -= 1));
  };

  if (isFetching) return;
  // console.log(searchResults);

  const movies = searchResults?.results?.filter(
    video => video.media_type === 'movie'
  );

  const shows = searchResults?.results?.filter(
    video => video.media_type === 'tv'
  );

  // console.log(shows);

  const moviesDisplays = movies.length > 0 && (
    <MoviePoster
      movies={{ results: movies, total_pages: searchResults?.total_pages }}
      search={params.search}
    />
  );

  const showsDisplays = shows.length > 0 && (
    <ShowPoster
      shows={{ results: shows, total_pages: searchResults?.total_pages }}
      search={params.search}
    />
  );

  const moviesFirst = movies[0]?.popularity > shows[0]?.popularity;
  // console.log(searchResults, movies.length, shows.length, moviesFirst);

  return (
    <div className={classes.searchFeedContainer}>
      <h2>
        Search results for{' '}
        <span style={{ color: '#eb1c24', marginLeft: '5px' }}>
          "{params.search}"{' '}
        </span>
        :
      </h2>
      {searchResults?.results.length < 1 && (
        <p style={{ fontSize: '20px', fontWeight: '500', margin: 0 }}>
          No matches found!
        </p>
      )}
      {moviesFirst ? (
        <>
          {moviesDisplays}
          {showsDisplays}
        </>
      ) : (
        <>
          {showsDisplays}
          {moviesDisplays}
        </>
      )}

      {searchResults?.results.length > 0 && (
        <div className="pagination" style={{ margin: 'auto' }}>
          <button disabled={searchPage === 1} onClick={() => setSearchPage(1)}>
            Page 1
          </button>
          <button
            disabled={searchPage <= 1}
            onClick={() => handlePagination('prev')}
          >
            Prev
          </button>
          <button
            disabled={
              searchPage > 5 || searchResults?.total_pages < searchPage + 1
            }
            onClick={() => handlePagination('next')}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFeed;
