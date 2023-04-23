import React from 'react';
import { NavLink } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <div className="footer">
      <div className="links">
        <NavLink to="">Home</NavLink>
        <NavLink to="/popularMovies">Popular Movies</NavLink>
        <NavLink to="/popularTv">Popular Shows</NavLink>
        <NavLink to="/about">About Us</NavLink>
      </div>

      <div className="socials">
        <TwitterIcon fontSize="14" sx={{ color: '#fff' }} />
        <FacebookIcon fontSize="14" sx={{ color: '#fff' }} />
        <InstagramIcon fontSize="14" sx={{ color: '#fff' }} />
      </div>

      <div className="copyrights">
        <p>
          Copyright © 2023 <span>ISDB Inc</span>
        </p>
        <span>All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default Footer;
