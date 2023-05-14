import React from 'react';
import { useGetSearchVideosQuery } from '../services/getMoviesApi';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
import demoPoster from '../assets/demoPoster.jpg';
import { useNavigate } from 'react-router-dom';

const SuggestionsBox = ({
  searchTerm,
  setSearchTerm,
  setShowCategory,
  setOpenMenu,
}) => {
  const navigate = useNavigate();

  const { data: searchResults, isFetching } = useGetSearchVideosQuery({
    searchTerm: searchTerm,
    page: 1,
  });

  if (isFetching) return;

  // console.log(searchResults);

  const sortedByPopularity = searchResults?.results
    ?.filter(video => video.popularity > 1)
    .sort((a, b) => b.popularity - a.popularity);

  const handleSuggestionClick = (type, id) => {
    navigate(`/${type === 'movie' ? type : 'show'}/${id}`);
    setSearchTerm('');
    setShowCategory('');
    setOpenMenu(false);
  };

  return (
    <div className="search-drop-down">
      <ul>
        {searchResults?.results.length < 1 && <li>No Matches Available</li>}
        {searchResults?.results.length > 1 &&
          sortedByPopularity.map((video, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(video.media_type, video.id)}
            >
              <img
                src={
                  video?.poster_path
                    ? `${IMG_PATH}/${video?.poster_path}`
                    : demoPoster
                }
                alt={video?.name || video?.title}
                loading="lazy"
              />
              <p>{video?.name || video?.title}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SuggestionsBox;
