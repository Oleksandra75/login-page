import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieDetails } from '../../../util/api'
import style from './movie.module.css'

const MovieDetail = () => {
	const [movieDetails, setMovieDetails] = useState()
	const [isFavorite, setFavorite] = useState(false)
	const { id } = useParams()

	const fetchDataAndFavorites = async () => {
		const data = await fetchMovieDetails(id)
		setMovieDetails(data)

		const favorites = JSON.parse(localStorage.getItem('favorites')) || []
		setFavorite(favorites.includes(id))
	}

	const toggleFavorite = () => {
		const favorites = JSON.parse(localStorage.getItem('favorites')) || []
		const updatedFavorites = isFavorite
			? favorites.filter(favoriteId => favoriteId !== id)
			: [...favorites, id]

		localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
		setFavorite(prevFavorite => !prevFavorite)
	}

	useEffect(() => {
		fetchDataAndFavorites()
	}, [id])

	return (
		<div className={style['movie']}>
			<div className={style['movie_intro']}>
				<img
					className={style['movie_backdrop']}
					src={`https://image.tmdb.org/t/p/original${
						movieDetails ? movieDetails.backdrop_path : ''
					}`}
					alt='Background'
				/>
			</div>
			<div className={style['movie_detail']}>
				<div className={style['movie_detailLeft']}>
					<div className={style['movie_posterBox']}>
						<img
							className={style['movie_poster']}
							src={`https://image.tmdb.org/t/p/original${
								movieDetails ? movieDetails.poster_path : ''
							}`}
							alt='Poster'
						/>
					</div>
				</div>
				<div className={style['movie_detailRight']}>
					<div className={style['movie_detailRightTop']}>
						<div className={style['movie_name']}>
							{movieDetails ? movieDetails.original_title : ''}
						</div>
						<div className={style['movie_tagline']}>
							{movieDetails ? movieDetails.tagline : ''}
						</div>
						<div className={style['movie_rating']}>
							{movieDetails ? movieDetails.vote_average : ''}{' '}
							<i className='fas fa-star' />
							<span className={style['movie_voteCount']}>
								{movieDetails ? `(${movieDetails.vote_count} votes)` : ''}
							</span>
						</div>
						<div className={style['movie_runtime']}>
							{movieDetails ? `${movieDetails.runtime} mins` : ''}
						</div>
						<div className={style['movie_releaseDate']}>
							{movieDetails ? `Release date: ${movieDetails.release_date}` : ''}
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
						<div className={style['text']}>
							{movieDetails ? movieDetails.overview : ''}
						</div>
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
