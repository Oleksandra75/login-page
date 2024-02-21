import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPopularMoviesAsync, selectMovieList } from 'features/movieSlice'

import style from './movieList.module.css'
import Card from 'components/Card/Card'

const Movie = () => {
  const dispatch = useDispatch()
  const movieList = useSelector(selectMovieList)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    page: 1,
  })

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    dispatch(fetchPopularMoviesAsync(filters))
  }, [dispatch, filters])

  const fetchMoreMovies = () => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: prevFilters.page + 1,
    }))
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) 
    {
      return
    }
    fetchMoreMovies()
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  return (
    <div className={style['movie_list']}>
      <h2 className={style['title']}>Movies Copy</h2>
      <div className={style['list_cards']}>
        {movieList.map(movie => (
          <Card key={movie.id} movie={movie} />
        ))}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  )
}

export default Movie
