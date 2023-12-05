import  { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import {SINGLE_USER} from '../../utils/queries'
import { useQuery } from '@apollo/client';
import TopKeywords from './TopKeywords'

const Profile = () => {
 

  const { loading, data } = useQuery(SINGLE_USER,{
    fetchPolicy: 'cache-and-network',
  });

  const userData = data?.singleUser
  console.log(userData)
  const [updatedData, setUpdatedData] = useState({userId: "", firstName: userData.firstName, lastName:userData.lastName, username:userData.username, oldPassword:'', password:'', confirmPassword:''});
  const [message, setMesage]=useState({message:'', status:''});

  const updateData= async (event)=>{
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

if(loading){
  return <h1>loading...</h1>
}

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="card-3d my-5" style={{ width: '40rem', padding: '20px' }}>
        <Card.Body>
          {/* <Card.Title className="text-center fw-bold fs-2">{userData.username}&apos;s Profile</Card.Title> */}
          <Form>
            {/* <Form.Group controlId="formBasicFirst">
              <Form.Label className='text-ad mb-2 mt-3'>First Name</Form.Label>
              <Form.Control
                type="text"
                name='firstName'
                defaultValue={userData.firstName}
                onChange={updateData}
              />
            </Form.Group>
            <Form.Group controlId="formBasicLast">
              <Form.Label className='text-ad mb-2 mt-3'>Last Name</Form.Label>
              <Form.Control
                type="text"
                name='lastName'
                defaultValue={userData.lastName}
                onChange={updateData}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='text-ad mb-2 mt-3'>Username</Form.Label>
              <Form.Control
                type="text"
                name='username'
                defaultValue={userData.username}
                onChange={updateData}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className='text-ad mb-2 mt-3'>Password</Form.Label>
              <Form.Control
                type="password"
                name='password'
                value={userData.password}
                onChange={updateData}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label className='text-ad mb-2 mt-3'>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name='confirmPassword'
                value={userData.confirmPassword}
                onChange={updateData}
                autoComplete="off"
              />
            </Form.Group> */}
            {/* {message.status==='error'?<p className='text-center mt-3' style={{color:"red"}}>{message.message}</p>:null} */}
            <Button variant="primary" type="submit" className="w-100 fw-bold mt-3">
              Submit
            </Button>
          </Form>
          <TopKeywords/>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;