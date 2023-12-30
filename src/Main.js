import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';
import Posts from './pages/Posts/Posts';
import PostDetails from './pages/Posts/PostDetails/PostDetails'
import Movie from './pages/Movies/Movie';
import MovieDetail from './pages/Movies/movieDetail/MovieDetail'
import FavoriteMovies from './pages/Movies/favoriteMovies/FavoriteMovies';

const router = createBrowserRouter([
   {
      path: "/",
      element: <Registration />,
   },
   {
      path: "/",
      element: < App />,
      children: [
         {
            path: "/home",
            element: < Home />,
         },
         {
            path: "/posts",
            element: <Posts />,
         },
         {
            path: "/posts/:id",
            element: < PostDetails />,
         },
         {
            path: "/movies",
            element: <Movie />,
         },
         {
            path: "/movie/:id",
            element: <MovieDetail />,
         },
         {
            path: "/favorite",
            element: <FavoriteMovies />,
         },
      ]
   },
]);

const main = () => {
   return (
      <RouterProvider router={router} />
   )
}

export default main