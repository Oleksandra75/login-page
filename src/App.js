import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { PostProvider } from './source/PostContext';

function App() {
  return (
    <div className='app__container'>
      <Navbar />
      <PostProvider>
        <Outlet />
      </PostProvider>
    </div>
  );
}

export default App;


