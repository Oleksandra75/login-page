import React, { createContext, useContext, useState, useEffect } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
   const [todos, setTodos] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize] = useState(10);
   const [totalPages, setTotalPages] = useState(null);
   const [viewMode, setViewMode] = useState(() => {
      return localStorage.getItem('viewMode') || 'list';
   });
   const baseURL = process.env.REACT_APP_API_URL;

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`${baseURL}/posts?_page=${currentPage}&_limit=${pageSize}`);
            if (!response.ok) {
               throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
            }
            const totalCount = response.headers.get('x-total-count');
            setTotalPages(Math.ceil(totalCount / pageSize));
            const data = await response.json();
            setTodos(data);
         } catch (error) {
            console.error('Error fetching posts:', error.message);
         }
      };

      fetchData();
   }, [baseURL, currentPage, pageSize]);

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
   };

   const toggleViewMode = () => {
      setViewMode((prevMode) => {
         const newMode = prevMode === 'list' ? 'table' : 'list';
         localStorage.setItem('viewMode', newMode);
         return newMode;
      });
   };

   return (
      <PostContext.Provider value={{ todos, currentPage, totalPages, handlePageChange, viewMode, toggleViewMode }}>
         {children}
      </PostContext.Provider>
   );
};

export const usePostContext = () => useContext(PostContext);
