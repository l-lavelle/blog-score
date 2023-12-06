import  { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import {SINGLE_USER} from '../../utils/queries'
import { useQuery } from '@apollo/client';
import TopKeywords from './TopKeywords'
import {UPDATE_USER} from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const UpdateProfile = (props) => {
//   const { loading, data } = useQuery(SINGLE_USER,{
//     fetchPolicy: 'cache-and-network',
//   });

//   const userData = data?.singleUser
//   console.log(userData)
  const [updateUser, { error }] = useMutation(UPDATE_USER, {refetchQueries:[
    SINGLE_USER
  ]});

  const [updatedData, setUpdatedData] = useState({userId: "", firstName: props.firstName, lastName:props.lastName, username: props.username, oldPassword:'', password:'', confirmPassword:''});
  
  const [message, setMesage]=useState({message:'', status:''});

  const updateData= async (event)=>{
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const userUpdate= async ()=>{
    try{
      await updateUser({
        variables: { 
          criteria:{
            firstName: updatedData.firstName, 
            lastName: updatedData.lastName, 
            username: updatedData.username,
          },
        }
      })
      if (error) {
        throw new Error('Unable to update post');
      }
    }catch (err){
      console.error(err)
    }
  };

// if(loading){
//   return <h1>loading...</h1>
// }

  return (
    <Form onSubmit={userUpdate}>
    <Form.Group controlId="formBasicFirst">
    <Form.Label className='text-ad mb-2 mt-3'>First Name</Form.Label>
    <Form.Control
        type="text"
        name='firstName'
        defaultValue={props.firstName}
        onChange={updateData}
    />
    </Form.Group>
    <Form.Group controlId="formBasicLast">
    <Form.Label className='text-ad mb-2 mt-3'>Last Name</Form.Label>
    <Form.Control
        type="text"
        name='lastName'
        defaultValue={props.lastName}
        onChange={updateData}
    />
    </Form.Group>
    <Form.Group controlId="formBasicEmail">
    <Form.Label className='text-ad mb-2 mt-3'>Username</Form.Label>
    <Form.Control
        type="text"
        name='username'
        defaultValue={props.username}
        onChange={updateData}
    />
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
    <Form.Label className='text-ad mb-2 mt-3'>Password</Form.Label>
    <Form.Control
        type="password"
        name='password'
        value={updatedData.password}
        onChange={updateData}
        autoComplete="off"
    />
    </Form.Group>

    <Form.Group controlId="formBasicConfirmPassword">
    <Form.Label className='text-ad mb-2 mt-3'>Confirm Password</Form.Label>
    <Form.Control
        type="password"
        name='confirmPassword'
        value={updatedData.confirmPassword}
        onChange={updateData}
        autoComplete="off"
    />
    </Form.Group>
    {message.status==='error'?<p className='text-center mt-3' style={{color:"red"}}>{message.message}</p>:null}
    {message.status==='success'?<p className='text-center mt-3' style={{color:"green"}}>{message.message}</p>:null}
    <Button variant="primary" type="submit" className="w-100 fw-bold mt-3">
    Submit
    </Button>
    </Form>
  );
};

export default UpdateProfile;
