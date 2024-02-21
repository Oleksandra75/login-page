import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PostProvider } from 'source/PostContext'
import { SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react'

import Home from 'pages/Home/Home'
import Posts from 'pages/Posts/Posts'
import PostDetails from 'pages/Posts/PostDetails/PostDetails'
import Movie from 'pages/Movies/Movie'
import MovieDetail from 'pages/Movies/movieDetail/MovieDetail'
import FavoriteMovies from 'pages/Movies/favoriteMovies/FavoriteMovies'
import Navbar from 'components/Navbar/Navbar'
import 'index.css'

function App() {
	return (
		<div className='app__container'>
			<SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<PostProvider>
					<Navbar />
					<Routes>
						{/*<Route path='/' element={<Registration />} />*/}
						<Route path='/home' element={<Home />} />
						<Route path='/posts' element={<Posts />} />
						<Route path='/posts/:id' element={<PostDetails />} />
						<Route path='/movies' element={<Movie />} />
						<Route path='/movie/:id' element={<MovieDetail />} />
						<Route path='/favorite' element={<FavoriteMovies />} />
					</Routes>
				</PostProvider>
			</SignedIn>
		</div>
	)
}

export default App
