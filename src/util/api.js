export async function fetchPosts(baseURL) {
	try {
		const response = await fetch(`${baseURL}/posts`)
		return response.json()
	} catch (error) {
		throw new Error(`Failed to fetch posts: ${error.message}`)
	}
}

export const getData = async (currentPage, pageSize, baseURL) => {
	try {
		const response = await fetch(
			`${baseURL}/posts?_page=${currentPage}&_limit=${pageSize}`
		)
		const totalCount = response.headers.get('x-total-count')
		const data = await response.json()
		return { data, totalPages: Math.ceil(totalCount / pageSize) }
	} catch (error) {
		throw new Error(`Error fetching posts: ${error.message}`)
	}
}

export async function getPost(id, baseURL) {
	try {
		const response = await fetch(`${baseURL}/posts/${id}`)
		return response.json()
	} catch (error) {
		throw new Error(`Failed to fetch post. ${error.message}`)
	}
}
const apiKey = process.env.REACT_APP_API_KEY_MOVIE

export const fetchPopularMovies = async () => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
		)
		const data = await response.json()
		return data.results
	} catch (error) {
		throw new Error(`Error fetching popular movies: ${error.message}`)
	}
}

export const fetchMovieDetails = async movieId => {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
		)
		return response.json()
	} catch (error) {
		throw new Error(`Error fetching popular movies: ${error.message}`)
	}
}
