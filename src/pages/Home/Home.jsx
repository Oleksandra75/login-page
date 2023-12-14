import React from 'react'
import { useNavigate } from 'react-router-dom';
import classes from './home.module.css'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={classes['page_container']}>
      <h1 className={classes['title']}>You are now logged in!</h1>
      <button className='back_button' onClick={() => navigate('/posts')}>Go to Posts</button>
    </div>
  )
}

export default Home