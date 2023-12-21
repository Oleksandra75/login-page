import React, {useEffect, useState} from "react"
import style from "./movie.module.css"
import { useParams } from "react-router-dom"

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const { id } = useParams();
    const apiKey = process.env.REACT_APP_KEY;

    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = (movieId) => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => setMovie(data));
    };
    return (
        <div className={style.movie}>
            <div className={style['movie__intro']}>
                <img className={style['movie__backdrop']} src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} alt="Image" />
            </div>
            <div className={style['movie__detail']}>
                <div className={style['movie__detailLeft']}>
                    <div className={style['movie__posterBox']}>
                        <img  className={style['movie__poster']} src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} alt="Image" />
                    </div>
                </div>
                <div className={style['movie__detailRight']}>
                    <div className={style['movie__detailRightTop']}>
                        <div className={style['movie__name']}>{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className={style['movie__tagline']}>{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className={style['movie__rating']}>
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className={style['movie__voteCount']}>{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className={style['movie__runtime']}>{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className={style['movie__releaseDate']}>{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className={style['movie__genres']}>
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className={style['movie__genre']} id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className={style['movie__detailRightBottom']}>
                        <div className={style['synopsisText']}>Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Movie