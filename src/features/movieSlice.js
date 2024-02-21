import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPopularMovies } from 'util/api'

export const fetchPopularMoviesAsync = createAsyncThunk(
	'movies/fetchPopularMovies',
	async (filters) => {
		const response = await fetchPopularMovies(filters)
		return response
	}
)

const initialState = {
	movieList: [],
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
				state.movieList = [...state.movieList, ...action.payload]
			})
			.addCase(fetchPopularMoviesAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

export const selectMovieList = state => state.movies.movieList

export default movieSlice.reducer
