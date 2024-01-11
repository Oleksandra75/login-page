import { usePostContext } from '../../source/PostContext';
import TodoList from '../TodoList/TodoList';
import classes from './post.module.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Post = () => {
  const { posts, currentPage, totalPages, handlePageChange } = usePostContext();

  return (
    <div>
      {posts && <TodoList posts={posts} />}
      <div className={classes.wrapper}>
        <button
          className={`${classes.btn}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack size={20} />
          <span className={classes.btnText}>Previous Page</span>
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`${classes.btn}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className={classes.btnText}>Next Page</span>
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </div>
  );
};

export default Post;

