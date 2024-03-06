import {createSlice } from '@reduxjs/toolkit'

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState: null,
  reducers: {
    setMovieDetails: (state, action) => action.payload,
  },
})

export const { setMovieDetails } = movieDetailsSlice.actions

export const selectMovieDetails = state => state.movieDetails

export default movieDetailsSlice.reducer
