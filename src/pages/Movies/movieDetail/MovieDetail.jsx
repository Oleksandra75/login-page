import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./movie.module.css";
import { fetchMovieDetails } from '../../../util/api';

const MovieDetail = () => {
    const [movieDetails, setMovieDetails] = useState();
    const [isFavorite, setFavorite] = useState(false);
    const { id } = useParams();

    const fetchDataAndFavorites = async () => {
        const data = await fetchMovieDetails(id);
        setMovieDetails(data);

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorite(favorites.includes(id));
    };

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const updatedFavorites = isFavorite
            ? favorites.filter((favoriteId) => favoriteId !== id)
            : [...favorites, id];

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorite((prevFavorite) => !prevFavorite);
    };

    useEffect(() => {
        fetchDataAndFavorites();
    }, [id]);

    return (
        <div className={style.movie}>
            <div className={style['movie__intro']}>
                <img className={style['movie__backdrop']} src={`https://image.tmdb.org/t/p/original${movieDetails ? movieDetails.backdrop_path : ""}`} alt="Background" />
            </div>
            <div className={style['movie__detail']}>
                <div className={style['movie__detailLeft']}>
                    <div className={style['movie__posterBox']}>
                        <img className={style['movie__poster']} src={`https://image.tmdb.org/t/p/original${movieDetails ? movieDetails.poster_path : ""}`} alt="Poster" />
                    </div>
                </div>
                <div className={style['movie__detailRight']}>
                    <div className={style['movie__detailRightTop']}>
                        <div className={style['movie__name']}>{movieDetails ? movieDetails.original_title : ""}</div>
                        <div className={style['movie__tagline']}>{movieDetails ? movieDetails.tagline : ""}</div>
                        <div className={style['movie__rating']}>
                            {movieDetails ? movieDetails.vote_average : ""} <i className="fas fa-star" />
                            <span className={style['movie__voteCount']}>{movieDetails ? `(${movieDetails.vote_count} votes)` : ""}</span>
                        </div>
                        <div className={style['movie__runtime']}>{movieDetails ? `${movieDetails.runtime} mins` : ""}</div>
                        <div className={style['movie__releaseDate']}>{movieDetails ? `Release date: ${movieDetails.release_date}` : ""}</div>
                        <div className={style['movie__genres']}>
                            {
                                movieDetails && movieDetails.genres
                                    ? movieDetails.genres.map(genre => (
                                        <span key={genre.id} className={style['movie__genre']} id={genre.id}>{genre.name}</span>
                                    ))
                                    : ""
                            }
                        </div>
                    </div>
                    <div className={style['movie__detailRightBottom']}>
                        <div className={style['synopsisText']}>Synopsis</div>
                        <div className={style['text']}>{movieDetails ? movieDetails.overview : ""}</div>
                        <button
                            className={style["favoriteButton"]}
                            onClick={toggleFavorite}
                        >
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;

