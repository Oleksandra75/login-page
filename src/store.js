import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './features/movieSlice'
import movieDetailsSlice from './features/movieDetailsSlice'


const store = configureStore({
  reducer: {
    movies: movieReducer,
    movieDetails: movieDetailsSlice,
  }
})

export default store
