import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { PostProvider } from './source/PostContext';
import axios from 'axios';
import { SearchProvider } from './source/SearchContext';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const searchAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function App() {
  return (
    <div className='app__container'>
      <SearchProvider searchAxiosInstance={searchAxiosInstance}>
        <Navbar />
      </SearchProvider>
      <PostProvider axiosInstance={axiosInstance}>
        <Outlet />
      </PostProvider>
    </div>
  );
}

export default App;

