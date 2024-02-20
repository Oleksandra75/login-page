import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { RiSearch2Line } from 'react-icons/ri'
import { FaBars, FaTimes } from 'react-icons/fa'
import styles from './navbar.module.css'
import useNavbarLogic from './navbarLogic'
import clsx from 'clsx'
import { SignOutButton } from '@clerk/clerk-react'
import '../../i18n'

const Navbar = () => {
  const [navToggler, setNavToggler] = useState(false)
  const closeNavbar = () => setNavToggler(false)
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isActive,
    setIsActive,
    showPopup,
    setShowPopup,
    handlePostClick,
  } = useNavbarLogic()

  const { t, i18n } = useTranslation()

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
  }

  return (
    <header className={styles['header']}>
      <div className={styles['header__container']}>
        <div className={styles['header__content']}>
          <Link to='/home' className={styles['header__logo']}>
            My<span>Posts</span>
          </Link>
          <div
            className={
              navToggler
                ? clsx(styles.navbarCollapse, styles.showNavbarCollapse)
                : styles.navbarCollapse
            }
          >
            <button
              type='button'
              className={styles['navbar-close-btn']}
              onClick={closeNavbar}
            >
              <FaTimes size={30} />
            </button>
            <ul className={styles['navbar-nav']}>
              <li className={styles['nav-item']}>
                <Link
                  to='/movies'
                  className={styles['nav-link']}
                  onClick={closeNavbar}
                >
                  {t('navbar.movies')}
                </Link>
              </li>
              <li className={styles['nav-item']}>
                <Link
                  to='/favorite'
                  className={styles['nav-link']}
                  onClick={closeNavbar}
                >
                  {t('navbar.favoriteMovies')}
                </Link>
              </li>
            </ul>
          </div>
          <form
            className={clsx(styles.search, { [styles.active]: isActive })}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
          >
            <div
              className={clsx(styles['search-box'], {
                [styles['search-box-right']]: !isActive,
              })}
            >
              {isActive ? (
                <input
                  className={styles['input']}
                  type='search'
                  placeholder={t('navbar.search')}
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value)
                    setShowPopup(true)
                  }}
                />
              ) : (
                <div
                  className={styles['icon']}
                  onClick={() => setIsActive(true)}
                >
                  <RiSearch2Line className={styles['btn']} />
                </div>
              )}
            </div>
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
          <button
            type='button'
            className={styles['navbar-open-btn']}
            onClick={() => setNavToggler(!navToggler)}
          >
            <FaBars size={30} />
          </button>
          <div className={styles['language-switcher']}>
            <button
              className={`${styles['language-button']} ${
                i18n.language === 'en' && styles.active
              }`}
              onClick={() => changeLanguage('en')}
            >
              En
            </button>
            <button
              className={`${styles['language-button']} ${
                i18n.language === 'uk' && styles.active
              }`}
              onClick={() => changeLanguage('uk')}
            >
              Uk
            </button>
          </div>
          <SignOutButton afterSignOutUrl='/' />
        </div>
      </div>
    </header>
  )
}

export default Navbar
