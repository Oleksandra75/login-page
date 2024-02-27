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
const tokenMovie = process.env.REACT_APP_TOKEN_MOVIE

const options = {
  method: 'GET',
     headers: {
       accept: 'application/json',
       Authorization:
         `Bearer ${tokenMovie}`,
  },
}

export const fetchPopularMovies = async (filters) => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?' +
          new URLSearchParams(filters),
        options
      )
      const data = await response.json()
      console.log(filters)
      return data.results
    } catch (error) {
        throw new Error(`Error fetching popular movies: ${error.message}`);
    }
};

export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            options
        );
        return response.json();
    } catch (error) {
        throw new Error(`Error fetching movie details: ${error.message}`);
    }
};
