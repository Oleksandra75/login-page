import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './features/movieSlice'
import movieDetailsReducer from './features/movieDetailsSlice'
import favoriteMoviesReducer from './features/favoriteMoviesSlice'

const store = configureStore({
  reducer: {
    movies: movieReducer,
    movieDetails: movieDetailsReducer,
    favoriteMovies: favoriteMoviesReducer
  },
})

export default store
