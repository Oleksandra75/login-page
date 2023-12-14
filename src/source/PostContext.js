import React, { createContext, useContext, useState, useEffect } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children, axiosInstance }) => {
   const [todos, setTodos] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize] = useState(10);
   const [totalPages, setTotalPages] = useState(null);
   const [viewMode, setViewMode] = useState('list');
   const linkClasses = 'post-link';

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axiosInstance.get(`/posts?_page=${currentPage}&_limit=${pageSize}`);
            const totalCount = response.headers['x-total-count'];
            setTotalPages(Math.ceil(totalCount / pageSize));
            setTodos(response.data);
         } catch (error) {
            console.error('Помилка завантаження постів:', error);
         }
      };
      fetchData();
   }, [axiosInstance, currentPage, pageSize]);

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
   };

   const toggleViewMode = () => {
      setViewMode((prevMode) => (prevMode === 'list' ? 'table' : 'list'));
   };

   return (
      <PostContext.Provider value={{ todos, currentPage, totalPages, handlePageChange, viewMode, toggleViewMode, linkClasses }}>
         {children}
      </PostContext.Provider>
   );
};

export const usePostContext = () => useContext(PostContext);

