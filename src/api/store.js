import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from '../services/getMoviesApi';

export default configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});
