import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    
    await fetch('PENDING BACKEND', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="card-3d my-5" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className="text-center">Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='text-ad m-3'>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className='text-ad m-3'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;


// import Auth from '../utils/auth';

// import { useMutation } from '@apollo/client';
// import {ADD_USER} from '../utils/mutations'

// const Login = () => {
  
//   const userinfo={username:"newUser2134",password:"12345",firstName:"tony", lastName:"denny" }

//   const [addUser, {error} ] = useMutation(ADD_USER);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const { data } = await addUser({
//         variables: { user:userinfo},
//       });
//       console.log(data)
//       Auth.login(data?.addUser?.token)

//       if (error) {
//         throw new Error('Unable create user');
//       }

//     } catch (error) {
//       console.log(error);
//     }

//   };

//     return (
//       <div>
//         <h1>Login Page- practicing signup</h1>
//         <button onClick={handleFormSubmit}>create trial user</button>
//       </div>
//     );
//   };
  
//   export default Login;