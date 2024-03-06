import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'

import styles from "./footer.module.css"

const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['wrapper']}>
        <div className={styles['infoText']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </div>
        <div className={styles['socialIcons']}>
          <span className={styles['icon']}>
            <FaFacebookF />
          </span>
          <span className={styles['icon']}>
            <FaInstagram />
          </span>
          <span className={styles['icon']}>
            <FaTwitter />
          </span>
          <span className={styles['icon']}>
            <FaLinkedin />
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer