import React, { useState, useEffect, useRef } from 'react'
import { useFetchPopularMoviesQuery } from 'features/apiSlice'
import Card from 'components/Card/Card'
import style from './movieList.module.css'

const MovieCopy = () => {
  const [page, setPage] = useState(50)
  const [minMaxPage, setMinMaxPage] = useState([50, 50])
  const movieWrapperRef = useRef(null)
  const [movies, setMovies] = useState([])

  const { data, error, isFetching } = useFetchPopularMoviesQuery(page)

  useEffect(() => {
    if (data) {
      if (data.page < minMaxPage[0]) {
        setMinMaxPage([data.page, minMaxPage[1]])
        setMovies([...data.results, ...movies])
      } else {
        setMinMaxPage([minMaxPage[0], data.page])
        setMovies([...movies, ...data.results])
      }
    }
  }, [data])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadMovies(1)
          }
        })
      },
      { threshold: 1 }
    )

    const { current } = movieWrapperRef
    if (current) {
      observer.observe(current)
      return () => {
        observer.unobserve(current)
      }
    }
  }, [minMaxPage, isFetching])

  const loadMovies = increment => {
    if (!isFetching) {
      setPage(prevPage => (increment > 0 ? prevPage + 1 : prevPage - 1))
    }
  }

  return (
    <div className={style['movie_list']}>
      <h2 className={style['title']}>Movies Copy</h2>
      <div className={style['movie_wrapper']} ref={movieWrapperRef}>
        <div className={style.list_cards}>
          {error && <p>Error: {error.message}</p>}
          {movies.map((movie, i) => (
            <Card key={i} movie={movie} />
          ))}
          {isFetching && <p>Loading more...</p>}
        </div>
      </div>
    </div>
  )
}

export default MovieCopy
