// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App'
import MainContent from './components/MainContent';
import Recent from "./components/Recent"
import Favorites from './components/Favorites';
import Login from './components/Login'
import SignUp from './components/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainContent />
      },
      {
        path: '/recent',
        element: <Recent />
      },
      {
        path: '/favorites',
        element: <Favorites />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)