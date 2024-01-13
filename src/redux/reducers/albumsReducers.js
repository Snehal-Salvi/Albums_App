import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint for albums
const API_URL = 'https://jsonplaceholder.typicode.com/albums';

// Async thunk to fetch albums
export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
  try {
    // Make a GET request to the API endpoint
    const response = await axios.get(API_URL);

    // Limit the fetched albums to the first 10
    return response.data.slice(0, 10);
  } catch (error) {
    // If there's an error, throw it to be caught in the calling code
    throw Error('Failed to fetch albums');
  }
});

// Define the albums slice
const albumsSlice = createSlice({
  name: 'albums',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {
    // Reducer for adding a new album
    addAlbum: (state, action) => {
      state.data.push(action.payload);
    },

    // Reducer for updating an album
    updateAlbum: (state, action) => {
      const { id, title } = action.payload;

      // Find the album by ID and update its title
      const albumToUpdate = state.data.find((album) => album.id === id);
      if (albumToUpdate) {
        albumToUpdate.title = title;
      }
    },

    // Reducer for deleting an album
    deleteAlbum: (state, action) => {
      // Filter out the album with the specified ID
      state.data = state.data.filter((album) => album.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Handle the fulfilled state of the fetchAlbums async thunk
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      // Set status to 'succeeded', and update the data with fetched albums
      state.status = 'succeeded';
      state.data = action.payload;

      // Log the fetched albums
      console.log('Fetched Albums:', action.payload);
    });
  },
});

// Export actions and reducer
export const { addAlbum, updateAlbum, deleteAlbum } = albumsSlice.actions;
export default albumsSlice.reducer;

// Selector to get the albums data from the state
export const albumsSelector = (state) => state.albums.data;
