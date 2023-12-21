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

  if (loading) {
    return (<></>)
  }

  return (
    <>
     <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg"  fixed="top" className='px-3 rounded-navbar'>
      <Navbar.Brand href="/" className='font-c color-c size-change'>B|S</Navbar.Brand>
       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
       <Navbar.Collapse id="responsive-navbar-nav">
       <Nav title="Dropdown" className="me-auto justify-content-end m-3" style={{ width: "100%" }}>
         {Auth.loggedIn()?( <Nav.Link href="/home">Home</Nav.Link>):(<Nav.Link href="/">Home</Nav.Link>)}
          <Nav.Link href="/recent">Recent</Nav.Link>
          {Auth.loggedIn()?( <Nav.Link href="/feed">Feed</Nav.Link>):(<Nav.Link href="/login">Feed</Nav.Link>)}
          {Auth.loggedIn()?( <Nav.Link href="/favorites">Favorites</Nav.Link>):(<Nav.Link href="/login">Favorites</Nav.Link>)}
          {Auth.loggedIn()?( 
          <NavDropdown 
          title={
            < >
                <img className="thumbnail-image img-size" 
                    src={userData.userPictureLink} 
                    alt="user pic"
                />
                {userData.username}
            </>
          } 
          id="collapsible-nav-dropdown">        
            <NavDropdown.Item href="/profile">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item href="/userDashboard">
               Dashboard
            </NavDropdown.Item>
            <NavDropdown.Item href="/friends">
              Friends
            </NavDropdown.Item>
            {Auth.IsAdmin()?<NavDropdown.Item href="admin">
              Admin
            </NavDropdown.Item>:[]}
            </NavDropdown>
              ):([])}  
          {Auth.loggedIn()?(<Nav.Link onClick={Auth.logout}>Logout</Nav.Link>):(<Nav.Link href="/login">Login</Nav.Link>)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
   </>
  );
};

export default NavBar;
