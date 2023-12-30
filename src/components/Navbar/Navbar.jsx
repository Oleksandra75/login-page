import React from 'react';
import { Link } from 'react-router-dom';
import { RiSearch2Line } from 'react-icons/ri';
import styles from './navbar.module.css';
import useNavbarLogic from './navbarLogic';
import clsx from 'clsx';

const Navbar = () => {
  const {
    searchTerm,
    setSearchTerm,
    posts,
    searchResults,
    isActive,
    setIsActive,
    showPopup,
    setShowPopup,
    handlePostClick,
  } = useNavbarLogic();

  return (
    <header className={styles.header}>
      <div className={styles['header__container']}>
        <Link to="/home" className={styles['header__logo']}>
          My<span>Posts</span>
        </Link>
        <div>
          <Link to="/movies" className={styles['header__item']}><span>Movies</span></Link>
          <Link to="/favorite" className={styles['header__item']}><span>Favorite Movies</span></Link>
        </div>
        <form
          className={clsx(styles.search, {[styles.active]: isActive })}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
        >
          <div className={styles['search-box']}>
            {isActive ? (
              <input
                className={styles['input']}
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowPopup(true);
                }}
              />
            ) : (
              <div className={styles['icon']} onClick={() => setIsActive(true)}>
                <RiSearch2Line className={styles['btn']} />
              </div>
            )}
          </div>
          {showPopup && searchTerm.trim() !== '' && (
            <ul className={styles['results-list']}>
              {searchResults.map((post) => (
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
