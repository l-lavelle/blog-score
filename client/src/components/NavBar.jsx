import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBar.css';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='px-3'>
      <Navbar.Brand href="#home" className='font-c color-c size-change'>BlogScore</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <div className="flex-grow-1"></div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end m-3" style={{ width: "100%" }}>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#recent">Recent</Nav.Link>
          <Nav.Link href="#favorites">Favorites</Nav.Link>
          <Nav.Link href="#login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
