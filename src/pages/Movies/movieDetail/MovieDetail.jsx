import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setMovieDetails } from '../../../features/movieDetailsSlice'
import { fetchMovieDetails } from '../../../util/api'
import style from './movie.module.css'

const MovieDetail = () => {
  const dispatch = useDispatch()
  const movieDetails = useSelector(state => state.movieDetails)
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [isFavorite, setFavorite] = useState(false)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovieDetails(id)
      dispatch(setMovieDetails(data))
      setLoading(false)
    }

    fetchData()
  }, [dispatch, id])

  useEffect(() => {
    const favoritesFromStorage =
      JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(favoritesFromStorage)
    setFavorite(favoritesFromStorage.includes(id))
  }, [id])

  const toggleFavorite = () => {
    const updatedFavorites = new Set([...favorites])
    if (isFavorite) {
      updatedFavorites.delete(id)
    } else {
      updatedFavorites.add(id)
    }
    localStorage.setItem('favorites', JSON.stringify([...updatedFavorites]))
    setFavorites([...updatedFavorites])
    setFavorite(!isFavorite)
  }

  if (isLoading) {
    return <div>Loading...</div>
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
                      id={genre.id}
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
              onClick={toggleFavorite}
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
