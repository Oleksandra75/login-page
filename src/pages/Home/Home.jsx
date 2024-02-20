import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../../i18n' 
import classes from './home.module.css'

const Home = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()

	return (
    <div className={classes['page_container']}>
      <h1 className={classes['title']}>{t('home.title')}</h1>
      <button className='back_button' onClick={() => navigate('/posts')}>
       {t('home.button')}
      </button>
    </div>
  )
}

export default Home
