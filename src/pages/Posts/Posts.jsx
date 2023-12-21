// Post.js
import React from 'react';
import { usePostContext } from '../../source/PostContext';
import TodoList from '../TodoList/TodoList';
import classes from './post.module.css';

const Post = () => {
  const { posts, currentPage, totalPages, handlePageChange } = usePostContext();

  return (
    <div>
      {posts && <TodoList posts={posts} />}
      <div className={classes.wrapper}>
        <button
          className={classes.btn}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={classes.btn}
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
