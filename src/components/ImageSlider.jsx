import React, { useEffect, useState } from 'react';
import classes from './ImageSlider.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import MovieCard from './MovieCard';

const ImageSlider = ({ timeFormatter, popularMovies }) => {
  const [winSize, setWinSize] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowSize = () => {
      const size = window.innerWidth;
      setWinSize(size);
    };
    window.addEventListener('resize', updateWindowSize);

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dotsClass: `slick-dots ${classes.customDots}`,
    arrows: winSize > 650 ? true : false,
  };

  return (
    <div className={classes.wrapper}>
      <h2>
        <span style={{ color: '#eb1c24' }}>Trending</span> Now:
      </h2>
      <div className={classes.sliderContainer}>
        <Slider {...settings} className={classes.sliderComponent}>
          {popularMovies?.results?.slice(0, 15).map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              timeFormatter={timeFormatter}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
