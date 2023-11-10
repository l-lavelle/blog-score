// TODO: tags curently seperated by comma will need to trim whitespace??
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';

import  { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

const AdminCreatePost = () => {
  const [addPost, {error} ] = useMutation(ADD_POST);
  
  const [postData, setPostData] = useState({ postTitle: '', postText: '', tags: []});

  const updateData = async (event)=>{
    const { name, value } = event.target;
    if (name==="tags"){
      const cleanTags= value.split(",")
      setPostData({ ...postData, [name]: cleanTags });
    }
    else{
    setPostData({ ...postData, [name]: value });
    }
  }

  const createPost = async (event) => {
    event.preventDefault();
    try {
      console.log(postData)
      const {data}  = await addPost({
        variables: {...postData },
      });
      
    //   Auth.login(data.login.token)

      if (error) {
        throw new Error('Unable login user');
      }

    } catch (error) {
      console.log(error);
    }
    
    setPostData({
      postTitle: '',
      postText: '',
      tags:[]
    })
  };
 
  
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="card-3d my-5" style={{ width: '22rem', padding: '20px' }}>
        <Card.Body>
          <Card.Title className="text-center fw-bold">Create New Blog Post</Card.Title>
          
          <Form onSubmit={createPost}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='text-ad m-3'>Blog Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Blog Title"
                name='postTitle'
                value={postData.postTitle}
                onChange={updateData}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className='text-ad m-3'> Blog Text</Form.Label>
              <Form.Control
                as="textarea" 
                rows={10}
                type="textarea"
                placeholder="Enter text"
                name='postText'
                value={postData.postText}
                onChange={updateData}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className='text-ad m-3'>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="add tags"
                name='tags'
                value={postData.tags}
                onChange={updateData}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 fw-bold mt-4">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    
    
  );
};

export default AdminCreatePost;


 // use to access auth role
  // const trialAuth= ()=>{
  //   console.log(Auth.IsAdmin().data.role)
  // }
  //<button onClick={trialAuth}>sf</button>