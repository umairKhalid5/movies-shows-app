import React from 'react';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';

const ScrollToTopArrow = () => {
  return (
    <div
      className="scrollTopContainer"
      style={{
        position: 'absolute',
        right: '25px',
        bottom: '10px',
        zIndex: 50,
        color: ' #fff',
      }}
    >
      <button
        className="scrollTopBtn"
        style={{
          height: '60px',
          width: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <KeyboardDoubleArrowUpRoundedIcon sx={{ fontSize: '30px' }} />
      </button>
    </div>
  );
};

export default ScrollToTopArrow;
