import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Registration from './components/Registration/Registration';
import Posts from './components/Posts/Posts';
import PostDetails from './components/Posts/PostDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/home' element={<Home />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/posts/:postId' element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

