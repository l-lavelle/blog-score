import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; 

const Footer = () => {
  return (
    <Container fluid className="footer-container">
      <Row>
        <Col href="#" className="footer-col">License</Col>
        <Col href="#" className="footer-col">Socials</Col>
        <Col href="#" className="footer-col">Developers</Col>
      </Row>
    </Container>
  );
};

export default Footer;
