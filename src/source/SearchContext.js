import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children}) => {
   const [searchTerm, setSearchTerm] = useState('');
   const [posts, setPosts] = useState([]);
   const [searchResults, setSearchResults] = useState([]);
   const [isActive, setIsActive] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const baseURL = process.env.REACT_APP_API_URL

   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const response = await fetch(`${baseURL}/posts`);
            if (!response.ok) {
               throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setPosts(data);
         } catch (error) {
            console.error('Error fetching posts:', error.message);
         }
      };

      fetchPosts();
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

   return (
      <SearchContext.Provider
         value={{
            searchTerm,
            setSearchTerm,
            posts,
            searchResults,
            isActive,
            setIsActive,
            showPopup,
            setShowPopup,
            handlePostClick,
         }}
      >
         {children}
      </SearchContext.Provider>
   );
};

export const useSearchContext = () => useContext(SearchContext);
