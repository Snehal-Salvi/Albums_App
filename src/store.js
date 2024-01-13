import albumsReducers from './redux/reducers/albumsReducers';
import { fetchAlbums } from './redux/reducers/albumsReducers';
import { configureStore } from '@reduxjs/toolkit';
import loggerMiddleware from 'redux-logger';

// Create the Redux store with the albums reducer and logger middleware
const store = configureStore({
  reducer: {
    albums: albumsReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

store.dispatch(fetchAlbums());

export default store;
