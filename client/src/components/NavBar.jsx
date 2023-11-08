import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#recent">Recent</Nav.Link>
        <Nav.Link href="#favorites">Favorites</Nav.Link>
        <Nav.Link href="#login">Login</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
