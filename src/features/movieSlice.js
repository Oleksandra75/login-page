import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPopularMovies } from 'util/api'

export const fetchPopularMoviesAsync = createAsyncThunk(
  'movies/fetchPopularMovies',
  async filters => {
    try {
      const response = await fetchPopularMovies(filters);
      return response;
    } catch (error) {
      throw error;
    }
  }
)

const initialState = {
  list: [],
  status: 'idle',
  error: null,
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchPopularMoviesAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPopularMoviesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
          if (Array.isArray(action.payload)) {
            state.list = [...state.list, ...action.payload]
          }
      })
      .addCase(fetchPopularMoviesAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectMovieList = state => state.movies

export default movieSlice.reducer
