import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container className="footer">
      <Row>
        <Col>License</Col>
        <Col>Socials</Col>
        <Col>Developers</Col>
      </Row>
    </Container>
  );
};

export default Footer;
