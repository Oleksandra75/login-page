import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { PostProvider } from './source/PostContext';
import { SearchProvider } from './source/SearchContext';

function App() {
  return (
    <div className='app__container'>
      <PostProvider>
        <SearchProvider>
          <Navbar />
          <Outlet />
        </SearchProvider>
      </PostProvider>
    </div>
  );
}

export default App;


