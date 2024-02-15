import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularMoviesAsync, selectMovieList } from '../../movieSlice'; 

import style from './movieList.module.css';
import Card from '../../components/Card/Card';

const Movie = () => {
  const dispatch = useDispatch();
  const movieList = useSelector(selectMovieList);

  useEffect(() => {
    dispatch(fetchPopularMoviesAsync());
  }, [dispatch]);

  return (
    <div className={style['movie_list']}>
      <h2 className={style['title']}>Popular movie</h2>
      <div className={style['list_cards']}>
        {movieList.map(movie => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movie;

