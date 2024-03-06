import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularMoviesAsync, selectMovieList } from 'features/movieSlice';
import style from './movieList.module.css';
import Card from 'components/Card/Card';

const MovieCopy = () => {
  const dispatch = useDispatch();
  const { list, error, status } = useSelector(selectMovieList);
  const [loader, setLoader] = useState(false);
  const [filters, setFilters] = useState({ page: 1 });
  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPopularMoviesAsync(filters));
  }, [filters, dispatch]);

  useEffect(() => {
    if (loader === true) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: prevFilters.page + 1,
      }));
    }
  }, [loader]);

  useEffect(() => {
    if (status !== 'loading') {
      setLoader(false);
    }
  }, [status]);

const handleScroll = () => {
  const container = containerRef.current
  if (
     status !== 'loading' && container.scrollTop + container.clientHeight >=
      container.scrollHeight - 50
  ) {
    setLoader(true)
  }
}

useEffect(() => {
  const container = containerRef.current

  container.addEventListener('scroll', handleScroll)
    return () => {
   container.removeEventListener('scroll', handleScroll)
  }
}, [status])

return (
  <div className={style['movie_list']} ref={containerRef}>
    <h2 className={style['title']}>Movies Copy</h2>
    <div className={style.list_cards}>
      {list.map((movie, i) => (
        <Card key={i} movie={movie} />
      ))}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error.message}</p>}
    </div>
  </div>
)
};

export default MovieCopy;
