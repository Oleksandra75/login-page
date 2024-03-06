import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from './card.module.css'

const Card = ({ movie }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
  }, [movie])

  const handleImageLoaded = () => {
    setLoading(false)
    console.log('cax')
  }

  return (
    <Link
      to={`/movie/${movie.id}`}
      style={{ textDecoration: 'none', color: 'white' }}
    >
      <div className={style['cards']} key={movie.id}>
        <div className={`${loading ? style['skeleton']: ""}`}>
          <img
            className={style['cards__img']}
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            alt={movie?.original_title}
            onLoad={handleImageLoaded}
          />
        </div>
        <div className={`${style['cards__overlay']}`}>
          <div className={style['card__title']}>{movie?.original_title}</div>
          <div className={style['card__runtime']}>
            {movie?.release_date}
            <span className={style['card__rating']}>
              {movie?.vote_average}
              <i className='fas fa-star' />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
