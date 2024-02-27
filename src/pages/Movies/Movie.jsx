import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPopularMoviesAsync, selectMovieList } from 'features/movieSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from 'components/Card/Card'
import style from './movieList.module.css'

const Movie = () => {
  const dispatch = useDispatch()
  const {list} = useSelector(selectMovieList)
  const [filters, setFilters] = useState({ page: 1 })
  
  useEffect(() => {
    dispatch(fetchPopularMoviesAsync(filters))
  }, [dispatch, filters])

  const fetchMoreMovies = () => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: prevFilters.page + 1,
    }))
  }

  return (
    <div className={style['movie_list']}>
      <h2 className={style['title']}>Popular Movies</h2>
      <InfiniteScroll
        dataLength={list.length}
        next={fetchMoreMovies}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more movies to load</p>}
      >
        <div className={style['list_cards']}>
          {list.map((movie, i) => (
            <Card key={i} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Movie
