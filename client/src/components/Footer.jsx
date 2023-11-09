import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; 

const Footer = () => {
  return (
    <Container fluid className="footer-container fixed-bottom">
      <Row>
      <Col className="footer-col">
          <Link to="/license" className="footer-link">License</Link>
        </Col>
        <Col className="footer-col">
          <Link to="/socials" className="footer-link">Socials</Link>
        </Col>
        <Col className="footer-col">
          <Link to="/developers" className="footer-link">Developers</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
