import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
      <div>
         {post && (
            <div>
               <h2 className='title'>{post.title}</h2>
               <p className='text'>{post.body}</p>
            </div>
         )}
      </div>
   );
};

export default PostDetails;
