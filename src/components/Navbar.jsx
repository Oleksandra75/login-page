import React from 'react';
import { Link } from 'react-router-dom';
import { RiSearch2Line } from 'react-icons/ri';
import styles from './navbar.module.css';
import { useSearchContext } from '../source/SearchContext';

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
        <div className={styles['header__logo']}>
          <Link to="/home">My<span>Posts</span></Link>
        </div>
        <form
          className={`${styles.search} ${isActive ? styles.active : ''}`}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
        >
          {isActive ? (
            <>
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
            </>
          ) : (
            <RiSearch2Line size={20} className={styles['search-btn']} />
          )}
          {showPopup && searchTerm.trim() !== '' && (
            <div className={styles['results-list']}>
              <div>
                <ul>
                  {searchResults.map(post => (
                    <li key={post.id} className={styles['popup-content']}>
                      <Link to={`/posts/${post.id}`} onClick={handlePostClick}>
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </form>
      </div>
    </header>
  );
};

export default Navbar;
