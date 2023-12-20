import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';
import Posts from './pages/Posts/Posts';
import PostDetails from './pages/Posts/PostDetails/PostDetails'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,
  },
  {
    path: "/",
    element: < App />,
    children: [
      {
        path: "/home",
        element: < Home />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/posts/:postId",
        element: < PostDetails />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);