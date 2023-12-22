import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-image-crop/dist/ReactCrop.css'

import App from './App';
import MainContent from './components/MainContent';
import Recent from "./components/Recent/Recent";
import Home from './components/HomePage/Home';
import Favorites from './components/Favorites/Favorites';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import About from './components/Footer/About'
import Guidelines from './components/Footer/Rules';
import Contact from './components/Footer/Contact'
import Profile from './components/Profile/Profile';
import FindUsers from './components/Profile/FindUsers/FindUsers';
import Friends from './components/Profile/Friends';
import SingleUserProfile from './components/Profile/SingleUserProfile/SingleUserProfile'
import ProfileDashboard from './components/Profile/ProfileDashboard/ProfileDashboard';
import Feed from './components/Feed/Feed';
import AdminDash from './components/admin/AdminDash/AdminDash';

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
        path: '/admin',
        element: <AdminDash/>
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
        path: '/friends',
        element: <Friends />
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
        path: '/userDashboard',
        element: <ProfileDashboard />
      },
      {
        path: '/friends/:id',
        element: <SingleUserProfile />
      },
      {
        path: '/user/:id',
        element: <SingleUserProfile />
      },
      {
        path: 'feed',
        element: <Feed />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);