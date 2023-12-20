import React from 'react';
import { Link } from 'react-router-dom';
import { RiSearch2Line } from 'react-icons/ri';
import styles from './navbar.module.css';
import { useSearchContext } from '../../source/SearchContext';

const Navbar = () => {
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isActive,
    setIsActive,
    showPopup,
    setShowPopup,
    handlePostClick,
  } = useSearchContext();

  return (
    <header className={styles.header}>
      <div className={styles['header__container']}>
        <Link to="/home" className={styles['header__logo']}>My<span>Posts</span></Link>
          <form
            className={`${styles.search} ${isActive ? styles.active : ''}`}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
          >
            {isActive ? (
              <input
                className={styles['search-box']}
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowPopup(true);
                }}
              />

            ) : (
              <RiSearch2Line size={20} className={styles['search-btn']} />
            )}
            {showPopup && searchTerm.trim() !== '' && (
              <ul className={styles['results-list']}>
                {searchResults.map(post => (
                  <li key={post.id} className={styles['popup-content']}>
                    <Link to={`/posts/${post.id}`} onClick={handlePostClick}>
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
    </header>
  );
};

export default Navbar;