import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Container fluid className="footer-container fixed-bottom footer-rounded">
      <Row>
        <Col className="footer-col"> 
        <p>
          <Link to='/about' className='footer-link'>About |</Link>
          <Link to='/guidelines' className='footer-link'> Guidelines |</Link>
          <Link to='/contact' className='footer-link'> Contact Us |</Link>
          <a className="footer-link" href="https://buy.stripe.com/bIYaFFbMs7Xe8A87ss"> Tips</a>
        </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
