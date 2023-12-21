import React, { useEffect, useState } from "react"
import style from "./movieList.module.css"
import Card from "../../components/card/Card"

const MovieList = () => {

   const [movieList, setMovieList] = useState([])
   const apiKey = process.env.REACT_APP_KEY;


   useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
         .then(res => res.json())
         .then(data => setMovieList(data.results))
   }, [apiKey])

   return (
      <div className={style["movie__list"]}>
         <h2 className={style["title"]}>Popular movie</h2>
         <div className={style["list__cards"]}>
            {
               movieList.map(movie => (
                  <Card movie={movie} />
               ))
            }
         </div>
      </div>
   )
}

export default MovieList