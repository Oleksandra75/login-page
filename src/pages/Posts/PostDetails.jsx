// PostDetails.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePostContext } from '../../source/PostContext';
import classes from './postDetails.module.css';

const PostDetails = () => {
   const { postId } = useParams();
   const { todos } = usePostContext();
   const post = todos.find((post) => post.id === parseInt(postId));

   return (
      <div className={classes['page-container']}>
         {post && (
            <div>
               <h2 className={classes.title}>{post.title}</h2>
               <p className={classes.text}>{post.body}</p>
               <Link to="/posts" className="back_button">
                  Back to Posts
               </Link>
            </div>
         )}
      </div>
   );
};

export default PostDetails;
