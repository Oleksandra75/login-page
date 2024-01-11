import React from "react"
import style from "./card.module.css"
import { Link } from "react-router-dom"

const Card = ({ movie }) => {

   return <>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
         <div className={style.cards} key={movie.id}>
                  <img className={style["cards__img"]} src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`} alt="Movie" />
                  <div className={style["cards__overlay"]}>
                     <div className={style["card__title"]}>{movie ? movie.original_title : ""}</div>
                     <div className={style["card__runtime"]}>
                        {movie ? movie.release_date : ""}
                        <span className={style["card__rating"]}>{movie ? movie.vote_average : ""}<i className="fas fa-star" /></span>
                     </div>
                  </div>
               </div>
       </Link>
   </>
}

export default Card