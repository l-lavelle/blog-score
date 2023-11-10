import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavBar.css';

import Auth from '../utils/auth';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className='px-3 rounded-navbar'>
      <Navbar.Brand href="/" className='font-c color-c size-change'>BlogScore</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <div className="flex-grow-1"></div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end m-3" style={{ width: "100%" }}>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/recent">Recent</Nav.Link>
          <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
          {/* {Auth.IsAdmin()?( */}
          <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/posts">
                Create a post
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/blogs">
                Manage Blog
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/users">Manage Users</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/profile">
                Profile
              </NavDropdown.Item>
            </NavDropdown>
            {/* ):([])} */}
          {Auth.loggedIn()?(<Nav.Link onClick={Auth.logout}>Logout</Nav.Link>):(<Nav.Link as={Link} to="/login">Login</Nav.Link>)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
