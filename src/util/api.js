export async function fetchPosts(baseURL) {
   const response = await fetch(`${baseURL}/posts`);
   if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
   }
   return response.json();
};


export const getData = async (currentPage, pageSize, baseURL) => {
   try {
      const response = await fetch(`${baseURL}/posts?_page=${currentPage}&_limit=${pageSize}`);
      if (!response.ok) {
         throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
      }
      const totalCount = response.headers.get('x-total-count');
      const data = await response.json();
      return { data, totalPages: Math.ceil(totalCount / pageSize) };
   } catch (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
   }
};

export async function getPost(id,baseURL) {
   const response = await fetch(
      `${baseURL}/posts/${id}`
   );
   if (!response.ok) {
      throw { message: 'Failed to fetch post.', status: 500 };
   }
   return response.json();
}
const apiKey = process.env.REACT_APP_KEY;

export const fetchPopularMovies = async () => {
   try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
      if (!response.ok) {
         throw new Error(`Failed to fetch popular movies: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data.results;
   } catch (error) {
      throw new Error(`Error fetching popular movies: ${error.message}`);
   }
};

export const fetchMovieDetails = async (movieId) => {
   const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
   );

   if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.status} ${response.statusText}`);
   }

   return response.json();
};