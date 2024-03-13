import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import favoriteMoviesReducer from './features/favoriteMoviesSlice'
import { apiMovie } from './features/apiSlice'; 


const store = configureStore({
  reducer: {
    favoriteMovies: favoriteMoviesReducer,
    [apiMovie.reducerPath]: apiMovie.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiMovie.middleware), 
})

export default store

 setupListeners(store.dispatch)