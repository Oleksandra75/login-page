import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMovieDetailsQuery } from 'features/apiSlice'
import { addToFavorites, removeFromFavorites } from 'features/favoriteMoviesSlice';
import style from './movie.module.css';

const MovieDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const { data: movieDetails, isLoading, isError } = useMovieDetailsQuery(id);

  const favoriteMovieIds = useSelector(state => state.favoriteMovies.favoriteMovieIds);
  const isFavorite = favoriteMovieIds.includes(id);

  if (isError) {
    return <div>Error loading movie details</div>;
  }

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={style['movie']}>
      <div className={style['movie_intro']}>
        <img
          className={style['movie_backdrop']}
          src={`https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`}
          alt='Background'
        />
      </div>
      <div className={style['movie_detail']}>
        <div className={style['movie_detailLeft']}>
          <div className={style['movie_posterBox']}>
            <img
              className={style['movie_poster']}
              src={`https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`}
              alt='Poster'
            />
          </div>
        </div>
        <div className={style['movie_detailRight']}>
          <div className={style['movie_detailRightTop']}>
            <div className={style['movie_name']}>
              {movieDetails?.original_title}
            </div>
            <div className={style['movie_tagline']}>
              {movieDetails?.tagline}
            </div>
            <div className={style['movie_rating']}>
              {movieDetails?.vote_average} <i className='fas fa-star' />
              <span className={style['movie_voteCount']}>
                {`(${movieDetails?.vote_count} votes)`}
              </span>
            </div>
            <div className={style['movie_runtime']}>
              {`${movieDetails?.runtime} mins`}
            </div>
            <div className={style['movie_releaseDate']}>
              {`Release date: ${movieDetails?.release_date}`}
            </div>
            <div className={style['movie_genres']}>
              {movieDetails && movieDetails.genres
                ? movieDetails.genres.map(genre => (
                    <span
                      key={genre.id}
                      className={style['movie_genre']}
                    >
                      {genre.name}
                    </span>
                  ))
                : ''}
            </div>
          </div>
          <div className={style['movie_detailRightBottom']}>
            <div className={style['synopsis_text']}>Synopsis</div>
            <div className={style['text']}>{movieDetails?.overview}</div>
            <button
              className={style['favorite_button']}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail

