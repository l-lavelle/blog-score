import  { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {SINGLE_USER} from '../../utils/queries'
import {UPDATE_USER} from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const UpdateProfile = (props) => {
  const [updateUser, { error }] = useMutation(UPDATE_USER,{refetchQueries:[
    SINGLE_USER
  ]});
  const [message, setMesage]=useState({message:'', status:''});
  const [updatedData, setUpdatedData] = useState({firstName: props.firstName, lastName:props.lastName, username: props.username, password:'', confirmPassword:''});

  const updateData= async (event)=>{
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const userUpdate= async (event)=>{
    event.preventDefault();
    try{
    if (updatedData.password){
      if (updatedData.password.length<5){
        setMesage({message:'Passwords must be longer than 5 characters', status:'error'})
      } else if (updatedData.password != updatedData.confirmPassword) {
          setMesage({message:'New passwords do not match', status:'error'})
      } else {
      await updateUser({
        variables: { 
          criteria:{
            firstName: updatedData.firstName, 
            lastName: updatedData.lastName, 
            username: updatedData.username,
            password: updatedData.password
          },
        }
      })
      setMesage({message:"Information Updated", status:"success"})
      setUpdatedData({
        firstName: props.firstName,
        lastName: props.lastName,
        username:props.username,
        password: "",
        confirmPassword:""
      })
     }
    } else {
      await updateUser({
        variables: { 
          criteria:{
            firstName: updatedData.firstName, 
            lastName: updatedData.lastName, 
            username: updatedData.username,
          },
        }})

        setMesage({message:"Information Updated", status:"success"})
        setUpdatedData({
          firstName: props.firstName,
          lastName: props.lastName,
          username:props.username
        })
      }
      if (error) {
        throw new Error('Unable to update post');
      }
    }catch (err){
      console.error(err)
      setMesage({message:"Unable to update user info", status:"error"})
    }
  };

  return (
    <Form onSubmit={userUpdate}>
    <Form.Group controlId="formBasicFirst">
    <Form.Label className='fs-4 mb-2 mt-3'>First Name</Form.Label>
    <Form.Control
        type="text"
        name='firstName'
        defaultValue={props.firstName}
        onChange={updateData}
    />
    </Form.Group>
    <Form.Group controlId="formBasicLast">
    <Form.Label className='fs-4 mb-2 mt-3'>Last Name</Form.Label>
    <Form.Control
        type="text"
        name='lastName'
        defaultValue={props.lastName}
        onChange={updateData}
    />
    </Form.Group>
    <Form.Group controlId="formBasicEmail">
    <Form.Label className='fs-4 mb-2 mt-3'>Username</Form.Label>
    <Form.Control
        type="text"
        name='username'
        defaultValue={props.username}
        onChange={updateData}
    />
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
    <Form.Label className='fs-4 mb-2 mt-3'>New Password</Form.Label>
    <Form.Control
        type="password"
        name='password'
        value={updatedData.password}
        onChange={updateData}
        autoComplete="off"
    />
    </Form.Group>

    <Form.Group controlId="formBasicConfirmPassword">
    <Form.Label className='fs-4 mb-2 mt-3'>Confirm Password</Form.Label>
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
    <Button variant="primary" type="submit" className="fw-bold mt-3">
    Save Changes
    </Button>
    </Form>
  );
};

export default UpdateProfile;
