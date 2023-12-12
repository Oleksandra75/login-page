import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from '../TodoList/TodoList';
import './post.css'

const Post = () => {
  const [todos, setTodos] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(7);
  const [totalPages, setTotalPages] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${pageSize}`
      );

      const totalCount = response.headers['x-total-count'];
      setTotalPages(Math.ceil(totalCount / pageSize));

      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {todos && <TodoList todos={todos} />}
      <div className='wrapper'>
        <button
          className='btn'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className='btn'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Post;
