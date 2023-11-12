import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import {ADD_USER} from '../utils/mutations'

import  { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './Login.css';



const SignUp = () => {
  const [addUser, {error} ] = useMutation(ADD_USER);
  const [userSignUpData, setUserSignUpData] = useState({ username: '', password: '' , firstName:'', lastName:''});

  const updateData= async (event)=>{
    const { name, value } = event.target;
    setUserSignUpData({ ...userSignUpData, [name]: value });
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const { data } = await addUser({
        variables: { user: userSignUpData},
      });

      Auth.login(data?.addUser?.token)

      if (error) {
        throw new Error('Unable to create user');
      }

    } catch (error) {
      console.log(error);
    }
      
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="card-3d my-5" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className="text-center fw-bold">Login</Card.Title>
          
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicFirst">
              <Form.Label className='text-ad m-3'>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name='firstName'
                value={userSignUpData.firstName}
                onChange={updateData}
              />
            </Form.Group>
            <Form.Group controlId="formBasicLast">
              <Form.Label className='text-ad m-3'>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name='lastName'
                value={userSignUpData.lastName}
                onChange={updateData}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='text-ad m-3'>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name='username'
                value={userSignUpData.username}
                onChange={updateData}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className='text-ad m-3'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={userSignUpData.password}
                onChange={updateData}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 fw-bold mt-4">
              Submit
            </Button>
            <h4 className='mt-3'>Already have an account? <Button className='btn-success'><span className='fw-bold' onClick={()=>window.location.assign("/login")}>Login here</span></Button></h4>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;