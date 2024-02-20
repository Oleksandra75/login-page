import React, { useEffect, useState } from 'react'
import { fetchMovieDetails } from '../../../util/api'
import Card from '../../../components/Card/Card'
import style from './favorite.module.css'
import { useTranslation } from 'react-i18next'
import '../../../i18n' 

const FavoriteMovies = () => {
	const [favoriteMovies, setFavoriteMovies] = useState([])
  const { t } = useTranslation()


	useEffect(() => {
		const fetchFavoriteMovies = async () => {
			const favorites = JSON.parse(localStorage.getItem('favorites')) || []

			if (favorites.length > 0) {
				const moviePromises = favorites.map(async movieId => {
					const data = await fetchMovieDetails(movieId)
					return data
				})

				const favoriteMoviesData = await Promise.all(moviePromises)
				const filteredMovies = favoriteMoviesData.filter(
					movie => movie !== null
				)
				setFavoriteMovies(filteredMovies)
			}
		}

		fetchFavoriteMovies()
	}, [])

	return (
		<div className={style['movie_list']}>
			<h2 className={style['title']}>{t('favorite.title')}</h2>
			{favoriteMovies.length > 0 ? (
				<div className={style['list_cards']}>
					{favoriteMovies.map(movie => (
						<Card key={movie.id} movie={movie} />
					))}
				</div>
			) : (
				<p>{t('favorite.message')}</p>
			)}
		</div>
	)
}

export default FavoriteMovies
