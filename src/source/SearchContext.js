import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children, searchAxiosInstance }) => {
   const [searchTerm, setSearchTerm] = useState('');
   const [posts, setPosts] = useState([]);
   const [searchResults, setSearchResults] = useState([]);
   const [isActive, setIsActive] = useState(false);
   const [showPopup, setShowPopup] = useState(false);

   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const response = await searchAxiosInstance.get(`/posts`);
            setPosts(response.data);
         } catch (error) {
            console.error('Error fetching posts:', error);
         }
      };

      fetchPosts();
   }, [searchAxiosInstance]);

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
