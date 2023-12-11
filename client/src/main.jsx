import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import MainContent from './components/MainContent';
import Recent from "./components/Recent/Recent";
import Home from './components/HomePage/Home';
import Favorites from './components/Favorites/Favorites';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import AdminCreatePost from './components/admin/AdminCreatePost';
import AdminManageBlog from './components/admin/AdminManageBlog';
import AdminManageUsers from './components/admin/AdminManageUsers';
import About from './components/Footer/About'
import Guidelines from './components/Footer/Rules';
import Contact from './components/Footer/Contact'
import UserComments from './components/Profile/UserComments'
import Profile from './components/Profile/Profile';
import FindUsers from './components/Profile/FindUsers';
import Friends from './components/Profile/Friends';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
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
        path: '/home',
        element: <MainContent />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/adminPosts',
        element: <AdminCreatePost />
      },
      {
        path: '/adminBlogs',
        element: <AdminManageBlog />
      },
      {
        path: '/adminUsers',
        element: <AdminManageUsers />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/guidelines',
        element: <Guidelines />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/userComments',
        element: <UserComments />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/users',
        element: <FindUsers />
      },
      {
        path: '/friends',
        element: <Friends />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);