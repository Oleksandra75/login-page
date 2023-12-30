import React, { useEffect, useState } from "react";
import { fetchMovieDetails } from '../../../util/api';
import Card  from "../../../components/card/Card";
import style from './favorite.module.css'

const FavoriteMovies = () => {
   const [favoriteMovies, setFavoriteMovies] = useState([]);

   useEffect(() => {
      const fetchFavoriteMovies = async () => {
         const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

         if (favorites.length > 0) {
            const moviePromises = favorites.map(async (movieId) => {
               const data = await fetchMovieDetails(movieId);
               return data;
            });

            const favoriteMoviesData = await Promise.all(moviePromises);
            const filteredMovies = favoriteMoviesData.filter((movie) => movie !== null);
            setFavoriteMovies(filteredMovies);
         }
      };

      fetchFavoriteMovies();
   }, []);

   return (
      <div className={style["movie__list"]}>
         <h2 className={style["title"]}>Favorite Movies</h2>
         {favoriteMovies.length > 0 ? (
            <div className={style["list__cards"]}>
               {favoriteMovies.map((movie) => (
                  <Card key={movie.id} movie={movie} />
               ))}
            </div>
         ) : (
            <p>You haven't added any favorite movies yet.</p>
         )}
      </div>
   );
};

export default FavoriteMovies;
