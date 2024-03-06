import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchPopularMoviesAsync,selectMovieList,setAddFilmsAtStart,} from 'features/movieSlice'
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import Card from 'components/Card/Card'
import style from './movieList.module.css'

const MovieCopy = () => {
  const dispatch = useDispatch()
  const { list, error, status } = useSelector(selectMovieList)
  const [filters, setFilters] = useState({ page: 50 })
  const [firstLoadedPage, setFirstLoadedPage] = useState(50)
  const [lastLoadedPage, setLastLoadedPage] = useState(50)
  const movieWrapperRef = useRef(null)
  const loader = useBoolean(false)

  useEffect(() => {
    dispatch(fetchPopularMoviesAsync(filters))
  }, [dispatch, filters])

  useEffect(() => {
    if (status !== 'loading') {
      loader.setFalse()
    }
  }, [status, loader])

const handleScrollToBottom = () => {
  loader.setTrue()
  dispatch(setAddFilmsAtStart(false))

  if (filters.page !== lastLoadedPage + 1) {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: lastLoadedPage + 1,
    }))
  }
}

const handleScrollToTop = () => {
  loader.setTrue()
  dispatch(setAddFilmsAtStart(true))

  if (filters.page !== firstLoadedPage - 1) {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: firstLoadedPage - 1,
    }))
  }
}

  const handleScroll = useDebounceCallback(event => {
    const { target } = event
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
      handleScrollToBottom()
    } else if (target.scrollTop === 0 && firstLoadedPage > 1) {
      handleScrollToTop()
    }
  }, 300)

  useEffect(() => {
    if (status === 'succeeded') {
      if (filters.page < firstLoadedPage) {
        const addedContentHeight = 1550
        movieWrapperRef.current.scrollTop = addedContentHeight
        setFirstLoadedPage(filters.page)
      } else if (filters.page > lastLoadedPage) {
        setLastLoadedPage(filters.page)
      }
    }
  }, [filters])

  return (
    <div className={style['movie_list']}>
      <h2 className={style['title']}>Movies Copy</h2>
      <div
        className={style['movie_wrapper']}
        ref={movieWrapperRef}
        onScroll={handleScroll}
      >
        <div className={style.list_cards}>
          {status === 'failed' && <p>Error: {error.message}</p>}
          {list.map((movie, i) => (
            <Card key={i} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieCopy
