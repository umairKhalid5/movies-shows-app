import React from 'react';
import { useGetPersonQuery } from '../services/getMoviesApi';
import { useParams } from 'react-router-dom';

const ActorDetails = () => {
  const params = useParams();
  const { data, isFetching } = useGetPersonQuery(params.id);
  if (isFetching) return;
  console.log(data);
  return <div>ActorDetails</div>;
};

export default ActorDetails;
