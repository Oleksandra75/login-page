import React from 'react'
import { useNavigate } from 'react-router-dom';
import './home.css'

const Home = () => {
  const navigate = useNavigate();

  const goToPosts = () => {
    navigate('/posts');
  };

  return (
    <div className='page_container'>
      <h1 className="title_in">You are now logged in!</h1>
      <button className='back_button' onClick={goToPosts}>Go to Posts</button>
    </div>
  )
}

export default Home