import React, { useEffect, useState } from "react";
import style from "./movieList.module.css";
import Card from "../../components/Card/Card";
import { fetchPopularMovies } from "../../util/api";

const Movie = () => {
   const [movieList, setMovieList] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const data = await fetchPopularMovies();
         setMovieList(data);
      };
      fetchData();
   }, []);

   return (
      <div className={style["movie__list"]}>
         <h2 className={style["title"]}>Popular movie</h2>
         <div className={style["list__cards"]}>
            {movieList.map((movie) => (
               <Card key={movie.id} movie={movie} />
            ))}
         </div>
      </div>
   );
};

export default Movie;