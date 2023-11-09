import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; 

const Footer = () => {
  return (
    <Container fluid className="footer-container fixed-bottom">
      <Row>
        <Col className="footer-col">
          <a href="#license" className="footer-link text-decoration-none text-reset fw-bold">License</a>
        </Col>
        <Col className="footer-col">
          <a href="#socials" className="footer-link text-decoration-none text-reset fw-bold">Socials</a>
        </Col>
        <Col className="footer-col">
          <a href="#developers" className="footer-link text-decoration-none text-reset fw-bold">Developers</a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
