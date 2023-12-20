import React from 'react';
import { useParams, Link } from 'react-router-dom';
import classes from './postDetails.module.css';
import { useSearchContext } from '../../../source/SearchContext';

const PostDetails = () => {
   const { postId } = useParams();
   const { posts } = useSearchContext();

   // Додайте перевірку, чи є пости доступні
   if (!posts || posts.length === 0) {
      return <p>Loading...</p>; // або будь-який інший елемент ви чекаєте
   }

   const post = posts.find((post) => post.id === parseInt(postId));

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

