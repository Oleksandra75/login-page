import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteMovieIds: JSON.parse(localStorage.getItem('favoriteMovieIds')) || [],
};

const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const movieId = action.payload;
      if (!state.favoriteMovieIds.includes(movieId)) {
        state.favoriteMovieIds.push(movieId);
        localStorage.setItem('favoriteMovieIds', JSON.stringify(state.favoriteMovieIds));
      }
    },
    removeFromFavorites: (state, action) => {
      const movieId = action.payload;
      state.favoriteMovieIds = state.favoriteMovieIds.filter(id => id !== movieId);
      localStorage.setItem('favoriteMovieIds', JSON.stringify(state.favoriteMovieIds));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;
