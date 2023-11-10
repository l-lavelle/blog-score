import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBar.css';

import Auth from '../utils/auth';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='px-3'>
      <Navbar.Brand href="#home" className='font-c color-c size-change'>BlogScore</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <div className="flex-grow-1"></div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end m-3" style={{ width: "100%" }}>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/recent">Recent</Nav.Link>
          <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
          {Auth.loggedIn()?(<Nav.Link onClick={Auth.logout}>Logout</Nav.Link>):(<Nav.Link as={Link} to="/login">Login</Nav.Link>)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
