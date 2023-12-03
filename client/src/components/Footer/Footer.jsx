import { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; 
import { Link } from 'react-router-dom';

const Footer = () => {
  const stripeButtonRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);

    const stripeButton = document.createElement('stripe-buy-button');
    stripeButton.setAttribute('buy-button-id', 'buy_btn_1OCCB2A2p3lCuJJsfZaJfShf');
    stripeButton.setAttribute('publishable-key', 'pk_live_51OC6JCA2p3lCuJJsAH88i2FWequKFvKIPMntoVtY1AZuOgYWXhO1xjOrKZNDWnGYavpZ5PiZx4x3AE0KgeU2Lo4i00j0ZUYIwX');

    if (stripeButtonRef.current) {
      stripeButtonRef.current.appendChild(stripeButton);
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Container fluid className="footer-container fixed-bottom footer-rounded">
      <Row>

        {/* Other footer columns */}
        <Col className="footer-col"> 
        <p>
          <Link to='/about' className='footer-link'>About </Link>|
          <Link to='/guidelines' className='footer-link'> Guidelines </Link>|
          <Link to='/contact' className='footer-link'> Contact Us </Link>
          {/* <p  ref={stripeButtonRef} className='footer-link'> Tips </p>
          <div ref={stripeButtonRef}></div> */}
        </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
