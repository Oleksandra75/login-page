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