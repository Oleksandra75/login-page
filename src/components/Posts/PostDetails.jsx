import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './postDetails.css';

const PostDetails = () => {
   const { postId } = useParams();
   const [post, setPost] = useState(null);

   useEffect(() => {
      const fetchPost = async () => {
         try {
            const res = await axios.get(
               `https://jsonplaceholder.typicode.com/posts/${postId}`
            );
            setPost(res.data);
         } catch (error) {
            console.error('Error fetching post:', error);
         }
      };

      fetchPost();
   }, [postId]);

   return (
      <div className='page_container'>
         {post && (
            <div>
               <h2 className='title'>{post.title}</h2>
               <p className='text'>{post.body}</p>
               <Link to="/posts" className="back_button">
                  Back to Posts
               </Link>
            </div>
         )}
      </div>
   );
};

export default PostDetails;
