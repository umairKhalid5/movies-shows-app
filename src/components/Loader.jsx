import React from 'react';
import { CircleLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="loader">
      <CircleLoader color="#eb1c24" size={100} />
    </div>
  );
};

export default Loader;
