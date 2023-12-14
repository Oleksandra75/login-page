// Post.js
import React from 'react';
import { usePostContext } from '../../source/PostContext';
import TodoList from '../TodoList/TodoList';
import './post.css';

const Post = () => {
  const { todos, currentPage, totalPages, handlePageChange } = usePostContext();

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
