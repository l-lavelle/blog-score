import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import {ADD_USER} from '../../utils/mutations'
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import '../Login/Login.css';

const SignUp = () => {
  const [addUser, {error} ] = useMutation(ADD_USER);
  const [message, setMesage]=useState({message:'', status:''})
  const [userSignUpData, setUserSignUpData] = useState({ username: '', password: '' , firstName:'', lastName:'', confirmPassword:''});

  const updateData= async (event)=>{
    const { name, value } = event.target;
    setUserSignUpData({ ...userSignUpData, [name]: value });
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    
    if (userSignUpData.password.length<5){
      setMesage({message:'Passwords must be longer than 5 characters', status:'error'})
    } else if (userSignUpData.password != userSignUpData.confirmPassword) {
        setMesage({message:'Passwords do not match', status:'error'})
    } else if (userSignUpData.username.length<4) {
      setMesage({message:'Username must be longer than 4 characters', status:'error'})
    } else{
    try {
      const { data } = await addUser({
        variables: { user: 
          {username:userSignUpData.username,
            password: userSignUpData.password,
            firstName: userSignUpData.firstName,
            lastName: userSignUpData.lastName}},
      });

      Auth.login(data?.addUser?.token)

      if (error) {
        throw new Error('Unable to create user');
      }
      window.location.assign("/home")

    } catch (error) {
      if(error.message===`E11000 duplicate key error collection: blog-score.users index: username_1 dup key: { username: "${userSignUpData.username}" }`){
        setMesage({message:'Username already exists', status:'error'})
      } else {
      setMesage({message:'Unable to create user', status:'error'})
      console.log(error.message);
      }
    }
   }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="card-3d my-5" style={{ width: '40rem' }}>
        <Card.Body>
          <Card.Title className="text-center fw-bold fs-2">Signup</Card.Title>
          
          <Form onSubmit={handleLogin} >
            <Form.Group controlId="formBasicFirst">
              <Form.Label className='text-ad mb-2 mt-3'>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name='firstName'
                value={userSignUpData.firstName}
                onChange={updateData}
              />
            </Form.Group>
            <Form.Group controlId="formBasicLast">
              <Form.Label className='text-ad mb-2 mt-3'>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name='lastName'
                value={userSignUpData.lastName}
                onChange={updateData}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='text-ad mb-2 mt-3'>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name='username'
                value={userSignUpData.username}
                onChange={updateData}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className='text-ad mb-2 mt-3'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={userSignUpData.password}
                onChange={updateData}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label className='text-ad mb-2 mt-3'>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name='confirmPassword'
                value={userSignUpData.confirmPassword}
                onChange={updateData}
                autoComplete="off"
              />
            </Form.Group>
            {message.status==='error'?<p className='text-center mt-3' style={{color:"red"}}>{message.message}</p>:null}
            <Button variant="primary" 
            disabled={!(userSignUpData.password && userSignUpData.username && userSignUpData.lastName && userSignUpData.firstName)} 
            type="submit" className="w-100 fw-bold mt-3">
              Submit
            </Button>
            <h4 className='mt-3 text-center'>Already have an account? </h4>
            <Link to="/login" className="btn btn-success w-100 fw-bold">Login here</Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;