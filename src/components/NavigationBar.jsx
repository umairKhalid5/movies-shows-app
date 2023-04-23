import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Box, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import TheatersIcon from '@mui/icons-material/Theaters';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CSSTransition } from 'react-transition-group';

const navItems = [
  { text: 'Movies', icon: <TheatersIcon /> },
  { text: 'Shows', icon: <LiveTvIcon /> },
];

const movieItems = [
  {
    text: 'Top Rated',
    path: '/topRatedMovies',
    icon: <ArrowUpwardIcon />,
  },
  {
    text: 'Upcoming',
    path: '/upcomingMovies',
    icon: <UpcomingIcon />,
  },
  {
    text: 'Popular',
    path: '/popularMovies',
    icon: <TrendingUpIcon />,
  },
];

const showItems = [
  {
    text: 'Top Rated',
    path: '/topRatedTv',
    icon: <ArrowUpwardIcon />,
  },
  {
    text: 'Popular',
    path: '/popularTv',
    icon: <TrendingUpIcon />,
  },
];

const NavigationBar = () => {
  const [showCategory, setShowCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [winSize, setWinSize] = useState(window.innerWidth);
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();
  const subMenuRef = useRef();

  const navDetailsLeft = (
    <>
      <Link className="logo" to="">
        <Avatar sx={{ height: 30, width: 30, bgcolor: 'transparent' }}>
          <OndemandVideoOutlinedIcon
            sx={{ color: '#eb1c24', transition: '0.3s ease' }}
          />
        </Avatar>
        <h2>ISDB</h2>
      </Link>
      <div className="divider"></div>
    </>
  );

  useEffect(() => {
    const updateWindowSize = () => {
      const size = window.innerWidth;
      setWinSize(size);
    };
    window.addEventListener('resize', updateWindowSize);

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    // if (winSize < 801) return;
    const hideSubMenu = e => {
      if (
        !e.target.classList.contains('hamburgerMenu') &&
        e.target !== subMenuRef.current &&
        !e.target?.closest('ul')?.classList.contains('desk-nav-list') &&
        !e.target?.closest('div')?.classList.contains('hamburgerMenu')
      ) {
        setShowCategory('');
        setOpenMenu(false);
      } else if (e.target?.closest('form')?.classList.contains('search')) {
        setShowCategory('');
      }
    };

    window.addEventListener('click', hideSubMenu);

    return () => {
      window.removeEventListener('click', hideSubMenu);
    };
  }, [openMenu]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search/${searchTerm}`);
    setSearchTerm('');
    setShowCategory('');
    setOpenMenu(false);
  };

  const MainNav = (
    <ul
      // className={!openMenu ? 'desk-nav-list' : 'desk-nav-list show'}
      className="desk-nav-list"
      ref={subMenuRef}
    >
      <li>
        <NavLink
          to=""
          className={navData => (navData.isActive ? 'active' : '')}
          onClick={() => {
            setOpenMenu(false);
            setShowCategory('');
          }}
        >
          <button className="navbar-item-button">
            <p>
              <i style={{ marginTop: '4px' }}>
                <HomeIcon />
              </i>
              Home
            </p>
          </button>
        </NavLink>
      </li>

      {navItems.map(item => (
        <li className="subMenu" key={item.text}>
          <button
            className="navbar-item-button"
            onClick={() =>
              showCategory !== item.text
                ? setShowCategory(item.text)
                : setShowCategory('')
            }
          >
            <p>
              <i style={{ marginTop: '4px' }}>{item.icon}</i>
              {item.text}
              <ArrowDropDownIcon />
            </p>
          </button>
          {showCategory === item.text && (
            <ul className="subList">
              {(item.text === 'Movies' ? movieItems : showItems).map(el => (
                <li key={el.text}>
                  <NavLink
                    to={el.path}
                    className={navData => (navData.isActive ? 'active' : '')}
                  >
                    <button
                      className="navbar-item-button"
                      onClick={() => {
                        setShowCategory('');
                        setOpenMenu(false);
                      }}
                    >
                      <p>
                        <i style={{ marginTop: '4px' }}>{el.icon}</i>
                        {el.text}
                      </p>
                    </button>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button>
          <SearchIcon />
        </button>
      </form>
    </ul>
  );

  const deskNav = (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        height: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',
        py: 1,
        zIndex: 500,
      }}
      bgcolor="#1a171e"
      color="#fff"
    >
      <Stack direction="row" pl={2}>
        {navDetailsLeft}
      </Stack>
      {winSize < 801 && (
        <div className="hamburgerMenu">
          <MenuIcon onClick={() => setOpenMenu(!openMenu)} />
        </div>
      )}
      {/* //? Commented out to test CSS transitions group */}
      {/* <ul
        className={!openMenu ? 'desk-nav-list' : 'desk-nav-list show'}
        ref={subMenuRef}
      >
        <li>
          <NavLink
            to=""
            className={navData => (navData.isActive ? 'active' : '')}
            onClick={() => {
              setOpenMenu(false);
              setShowCategory('');
            }}
          >
            <button className="navbar-item-button">
              <p>
                <i style={{ marginTop: '4px' }}>
                  <HomeIcon />
                </i>
                Home
              </p>
            </button>
          </NavLink>
        </li>

        {navItems.map(item => (
          <li className="subMenu" key={item.text}>
            <button
              className="navbar-item-button"
              onClick={() =>
                showCategory !== item.text
                  ? setShowCategory(item.text)
                  : setShowCategory('')
              }
            >
              <p>
                <i style={{ marginTop: '4px' }}>{item.icon}</i>
                {item.text}
                <ArrowDropDownIcon />
              </p>
            </button>
            {showCategory === item.text && (
              <ul className="subList">
                {(item.text === 'Movies' ? movieItems : showItems).map(el => (
                  <li key={el.text}>
                    <NavLink
                      to={el.path}
                      className={navData => (navData.isActive ? 'active' : '')}
                    >
                      <button
                        className="navbar-item-button"
                        onClick={() => {
                          setShowCategory('');
                          setOpenMenu(false);
                        }}
                      >
                        <p>
                          <i style={{ marginTop: '4px' }}>{el.icon}</i>
                          {el.text}
                        </p>
                      </button>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button>
            <SearchIcon />
          </button>
        </form>
      </ul> */}

      {/* //? Css Transitions Group */}
      {winSize > 800 ? (
        MainNav
      ) : (
        <CSSTransition
          in={openMenu}
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 1000, exit: 500 }}
          classNames={{
            enter: '',
            enterActive: 'navSlide show',
            exit: '',
            exitActive: 'navSlide hide',
          }}
        >
          {MainNav}
        </CSSTransition>
      )}
    </Box>
  );

  return <nav>{deskNav}</nav>;
};

export default NavigationBar;
