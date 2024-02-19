import React, { useEffect, useState } from 'react'
import { fetchMovieDetails } from '../../../util/api'
import Card from '../../../components/Card/Card'
import style from './favorite.module.css'

const FavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([])

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || []

      const moviePromises = favorites.map(async movieId => {
        const data = await fetchMovieDetails(movieId)
        return data
      })

      const favoriteMoviesData = await Promise.all(moviePromises)
      const filteredMovies = favoriteMoviesData.filter(
        movie => movie && movie.id
      )
      setFavoriteMovies(filteredMovies)
    }

    fetchFavoriteMovies()
  }, [])

  return (
    <div className={style['movie_list']}>
      <h2 className={style['title']}>Favorite Movies</h2>
      {favoriteMovies.length > 0 ? (
        <div className={style['list_cards']}>
          {favoriteMovies.map(movie => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>You haven't added any favorite movies yet.</p>
      )}
    </div>
  )
}

export default FavoriteMovies
