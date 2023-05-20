import React, { useEffect, useState } from 'react';
import { useGetSearchVideosQuery } from '../services/getMoviesApi';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
import demoPoster from '../assets/demoPoster.jpg';
import { useNavigate } from 'react-router-dom';
import TransitionWrapper from './transitionWrapper/TransitionWrapper';

const SuggestionsBox = ({
  searchTerm,
  setSearchTerm,
  setShowCategory,
  setOpenMenu,
}) => {
  const navigate = useNavigate();
  const [showData, setShowData] = useState(false);

  const { data: searchResults, isFetching } = useGetSearchVideosQuery({
    searchTerm: searchTerm,
    page: 1,
  });

  useEffect(() => {
    setShowData(false);
    setTimeout(() => {
      setShowData(true);
    }, 250);
  }, [isFetching]);

  if (isFetching) return;

  // console.log(searchResults);

  const sortedByPopularity = searchResults?.results
    ?.filter(video => video.popularity > 1)
    .sort((a, b) => b.popularity - a.popularity);
  // console.log(sortedByPopularity);

  const handleSuggestionClick = (type, id) => {
    if (type === 'person') navigate(`/person/${id}`);
    else navigate(`/${type === 'movie' ? type : 'show'}/${id}`);
    setSearchTerm('');
    setShowCategory('');
    setOpenMenu(false);
  };

  const fields = {
    Acting: 'Actor',
    Directing: 'Director',
    Sound: 'Music',
  };

  return (
    <TransitionWrapper inCondition={showData} eTime={200}>
      <div className="search-drop-down">
        <ul>
          {searchResults?.results.length < 1 && <li>No Matches Available</li>}
          {searchResults?.results.length >= 1 &&
            sortedByPopularity.map((video, idx) => (
              <li
                key={idx}
                onClick={() =>
                  handleSuggestionClick(video.media_type, video.id)
                }
              >
                <img
                  src={
                    video?.poster_path
                      ? `${IMG_PATH}/${video?.poster_path}`
                      : video?.media_type === 'person' && video?.profile_path
                      ? `${IMG_PATH}/${video?.profile_path}`
                      : demoPoster
                  }
                  alt={video?.name || video?.title}
                  loading="lazy"
                />
                <p>
                  {video?.name || video?.title} (
                  {new Date(
                    video?.release_date || video?.first_air_date
                  )?.getFullYear() ||
                    fields[video?.known_for_department] ||
                    'Unknown'}
                  )
                </p>
              </li>
            ))}
        </ul>
      </div>
    </TransitionWrapper>
  );
};

export default SuggestionsBox;
