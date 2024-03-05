import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPopularMovies } from 'util/api'

export const fetchPopularMoviesAsync = createAsyncThunk(
  'movies/fetchPopularMovies',
  async filters => {
    try {
      const response = await fetchPopularMovies(filters)
      return response
    } catch (error) {
      throw error
    }
  }
)

const initialState = {
  list: [],
  status: 'idle',
  error: null,
  addFilmsAtStart: false, 
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setAddFilmsAtStart(state, action) {
      state.addFilmsAtStart = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPopularMoviesAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPopularMoviesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (Array.isArray(action.payload)) {
          if (state.addFilmsAtStart) {
            state.list = [...action.payload, ...state.list]
          } else {
            state.list = [...state.list, ...action.payload]
          }
        }
      })
      .addCase(fetchPopularMoviesAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setAddFilmsAtStart } = movieSlice.actions

export const selectMovieList = state => state.movies

export default movieSlice.reducer
