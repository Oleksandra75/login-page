import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Registration from './components/Registration';
import Posts from './components/Posts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registration />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/posts' element={<Posts />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
