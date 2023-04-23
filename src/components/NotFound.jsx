import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const [time, setTime] = useState(5);
  const navigate = useNavigate();

  const updateTime = () => setTime(time => (time -= 1));

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);

    const timeOut = setTimeout(() => {
      clearInterval(interval);
      navigate('', { replace: true });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeOut);
      setTime(5);
    };
  }, []);

  return (
    <div className="notFound">
      <h2>Oops! Page not Found</h2>
      <p>
        Go to <Link to="">Home</Link>
      </p>
      <p>
        Navigating to <Link to="">Home</Link> in {time}s
      </p>
    </div>
  );
};

export default NotFound;
