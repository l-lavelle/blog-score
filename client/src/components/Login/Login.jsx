import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import {LOGIN} from '../../utils/mutations';
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [login, {error} ] = useMutation(LOGIN);
  const [message, setMesage]=useState({message:'', status:''});
  const [userLoginData, setUserLoginData] = useState({ displayName: '', password: '' });

  const updateData= async (event)=>{
    const { name, value } = event.target;
    setUserLoginData({ ...userLoginData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const {data}  = await login({
        variables: { 
        displayName: userLoginData.displayName,
        password: userLoginData.password
      },
      });

      Auth.login(data.login.token)

      if (error) {
        throw new Error('Unable login user');
      }
      window.location.assign("/home")

    } catch (error) {
      setMesage({message:'Username or password incorrect', status:'error'})
      console.log(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className="card-3d my-5" style={{ width: '40rem', padding: '20px' }}>
        <Card.Body>
          <Card.Title className="text-center fw-bold fs-2">Login</Card.Title>
          
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='text-ad mb-2 mt-3'>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name='displayName'
                value={userLoginData.displayName}
                onChange={updateData}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className='text-ad mb-2 mt-3'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={userLoginData.password}
                onChange={updateData} 
              />
            </Form.Group>
            {message.status==='error'?<p className='text-center mt-3' style={{color:"red"}}>{message.message}</p>:null}
            <Button type="submit" className="w-100 fw-bold mt-3 login-btn"
            disabled={!(userLoginData.displayName && userLoginData.password)}>
              Submit
            </Button>
            <h4 className='mt-3 text-center'>Don&apos;t have an account? </h4>
            <Link to="/signup" className="btn w-100 fw-bold signup-link">Signup here</Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;






