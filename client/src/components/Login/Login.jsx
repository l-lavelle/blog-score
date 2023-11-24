import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import {LOGIN} from '../../utils/mutations'

import  { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [login, {error} ] = useMutation(LOGIN);
  
  const [userLoginData, setUserLoginData] = useState({ username: '', password: '' });

  const updateData= async (event)=>{
    const { name, value } = event.target;
    setUserLoginData({ ...userLoginData, [name]: value });
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const {data}  = await login({
        variables: { username: userLoginData.username,
        password: userLoginData.password},
      });

      Auth.login(data.login.token)

      if (error) {
        throw new Error('Unable login user');
      }
      window.location.assign("/home")
    } catch (error) {
      console.log(error);
    }
    
    setUserLoginData({
      username: '',
      password: '',
    })
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="card-3d my-5" style={{ width: '22rem', padding: '20px' }}>
        <Card.Body>
          <Card.Title className="text-center fw-bold">Login</Card.Title>
          
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='text-ad m-3'>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name='username'
                value={userLoginData.username}
                onChange={updateData}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className='text-ad m-3'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={userLoginData.password}
                onChange={updateData}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 fw-bold mt-4">
              Submit
            </Button>
            <Button className='d-flex justify-content-center btn-success text-center w-100 mt-4 p-1'>
            <span onClick={()=>window.location.assign("/signup")}><h3>Click to Signup</h3></span>
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;






