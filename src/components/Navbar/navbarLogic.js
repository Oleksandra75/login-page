import { useState, useEffect } from 'react';
import { fetchPosts } from '../../util/api';

const useNavbarLogic = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [posts, setPosts] = useState([]);
   const [searchResults, setSearchResults] = useState([]);
   const [isActive, setIsActive] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const baseURL = process.env.REACT_APP_API_URL;

   useEffect(() => {
      const fetchPost = async () => {
         try {
            const data = await fetchPosts(baseURL);
            setPosts(data);
         } catch (error) {
            console.error('Error fetching posts:', error.message);
         }
      };

      fetchPost();
   }, [baseURL]);

   useEffect(() => {
      const filteredResults = posts.filter(post =>
         post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
   }, [posts, searchTerm]);

   const handlePostClick = () => {
      setSearchTerm('');
      setShowPopup(false);
   };

   return {
      searchTerm,
      setSearchTerm,
      posts,
      searchResults,
      isActive,
      setIsActive,
      showPopup,
      setShowPopup,
      handlePostClick,
   };
};

export default useNavbarLogic;