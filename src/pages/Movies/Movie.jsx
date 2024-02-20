import React, { useEffect, useState } from 'react'
import style from './movieList.module.css'
import Card from '../../components/Card/Card'
import { fetchPopularMovies } from '../../util/api'
import { useTranslation } from 'react-i18next'
import '../../i18n' 

const Movie = () => {
	const [movieList, setMovieList] = useState([])
	const { t } = useTranslation()

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchPopularMovies()
			setMovieList(data)
		}
		fetchData()
	}, [])

	return (
		<div className={style['movie_list']}>
			<h2 className={style['title']}>{t('movie.title')}</h2>
			<div className={style['list_cards']}>
				{movieList.map(movie => (
					<Card key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	)
}

export default Movie
