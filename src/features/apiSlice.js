import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tokenMovie = process.env.REACT_APP_TOKEN_MOVIE

export const apiMovie = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    prepareHeaders(headers) {
      headers.set('Authorization', `Bearer ${tokenMovie}`)
      return headers
    },
  }),
  tagTypes: ['Movies'],
  endpoints: builder => ({
    fetchPopularMovies: builder.query({
      query: page => `movie/popular?${new URLSearchParams({page}).toString()}`,
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    movieDetails: builder.query({
      query: movieId => `movie/${movieId}?language=en-US`,
    }),
  }),
  //keepUnusedData: true,
})

export const { useFetchPopularMoviesQuery, useMovieDetailsQuery } = apiMovie
