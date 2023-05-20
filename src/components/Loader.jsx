import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="loader">
      <PropagateLoader color="#eb1c24" size={15} />
    </div>
  );
};

export default Loader;
