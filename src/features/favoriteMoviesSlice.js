import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies')) || [],
}

const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState,
  reducers: {
    setFavoriteMovies: (state, action) => {
      state.favoriteMovies = action.payload
    },
    addToFavorites: (state, action) => {
      state.favoriteMovies.push(action.payload)
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(state.favoriteMovies)
      )
    },
    removeFromFavorites: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        movieId => movieId !== action.payload
      )
      localStorage.setItem(
        'favoriteMovies',
        JSON.stringify(state.favoriteMovies)
      )
    },
  },
})

export const { setFavoriteMovies, addToFavorites, removeFromFavorites } = favoriteMoviesSlice.actions
export default favoriteMoviesSlice.reducer
