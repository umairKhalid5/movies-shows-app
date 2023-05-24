import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <motion.div
      className="notFound"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h2>Oops! Page not Found</h2>
      <p>
        Go to <Link to="">Home</Link>
      </p>
      <p>
        Navigating to <Link to="">Home</Link> in {time}s
      </p>
    </motion.div>
  );
};

export default NotFound;
