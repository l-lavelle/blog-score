import { Navbar, Nav } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useQuery } from '@apollo/client';
import {SINGLE_USER} from '../../utils/queries'
import './NavBar.css';

import Auth from '../../utils/auth';

const NavBar = () => {
  const { loading, data } = useQuery(SINGLE_USER,{
    fetchPolicy: 'cache-and-network',
  });
  const userData=data?.singleUser
  console.log(userData)

  if (loading) {
    return (
    <>
      <h1>Loading...</h1>
    </>
    )
  }

  return (
    <>
     <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg"  fixed="top" className='px-3 rounded-navbar'>
      <Navbar.Brand href="/" className='font-c color-c size-change'>B|S</Navbar.Brand>
       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
       <Navbar.Collapse id="responsive-navbar-nav">
       <Nav title="Dropdown" className="me-auto justify-content-end m-3" style={{ width: "100%" }}>
         {Auth.loggedIn()?( <Nav.Link href="home">Home</Nav.Link>):(<Nav.Link href="/">Home</Nav.Link>)}
          <Nav.Link href="recent">Recent</Nav.Link>
          {Auth.loggedIn()?( <Nav.Link href="/favorites">Favorites</Nav.Link>):(<Nav.Link href="/login">Favorites</Nav.Link>)}
          {Auth.loggedIn()?( 
          <NavDropdown 
          title={
            < >
                <img className="thumbnail-image img-size" 
                    src={"https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} 
                    alt="user pic"
                />
                {userData.username}
            </>
        } 
          // title={userData.username} 
          id="collapsible-nav-dropdown">
            <NavDropdown.Item href="/profile">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item href="/userComments">
              Manage Comments
            </NavDropdown.Item>
            <NavDropdown.Item href="/friends">
              Friends
            </NavDropdown.Item>
            </NavDropdown>
              ):([])}  
          {Auth.IsAdmin()?( 
          <NavDropdown title="Admin" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="/adminPosts">
              Create a post
            </NavDropdown.Item>
            <NavDropdown.Item href="/adminBlogs">
              Manage Blog
            </NavDropdown.Item>
            <NavDropdown.Item href="/adminUsers">Manage Users</NavDropdown.Item>
          </NavDropdown>):([])}  
          {Auth.loggedIn()?(<Nav.Link onClick={Auth.logout}>Logout</Nav.Link>):(<Nav.Link href="/login">Login</Nav.Link>)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
   </>
  );
};

export default NavBar;
