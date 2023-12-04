import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import  { useState } from 'react';
import { Container, Form, Button, Card, Col, Row } from 'react-bootstrap';
import './AdminCreatePost.css'

const AdminCreatePost = () => {
  const [addPost, {error} ] = useMutation(ADD_POST);
  const [message, setMesage]=useState('');
  const [postData, setPostData] = useState({ postTitle: '', postText: '', tags: []});

  const updateData = async (event)=>{
    const { name, value } = event.target;
    if (name==="tags"){
      const cleanTags= value.split(",").map(function(tag) {
        return tag.trim();
      });
      console.log(cleanTags)
      setPostData({ ...postData, [name]: cleanTags });
    }
    else{
    setPostData({ ...postData, [name]: value });
    }
  };

  const createPost = async (event) => {
    event.preventDefault();
    try {
      await addPost({
        variables: {...postData },
      });
      if (error) {
        throw new Error('Unable post');
      }

    } catch (error) {
      console.log(error);
    }
    setMesage( "success" );
    setPostData({
      postTitle: '',
      postText: '',
      tags:[]
    })
  };
 
  
  return (
    <Container fluid={true}>
      <Row>
      <Col>
      <Card className="card-3d " style={{ padding: '5px' }}>
        <Card.Body>
          <Card.Title className="text-center fw-bold fs-2">Create New Blog Post</Card.Title>
          <Form onSubmit={createPost} onClick={()=>{setMesage('')}}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='text-ad m-3'>Blog Title</Form.Label>
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
              <p>Please seperate multiple tags with comma</p>
              <Form.Control
                type="text"
                placeholder="add tags"
                name='tags'
                value={postData.tags}
                onChange={updateData}
              />
            </Form.Group>
            <div className="text-center">
            <Button style={{ maxWidth: '20vw',  padding: '5px', background: "#14e956" , border: "black", color:"black"}} disabled={!(postData.postTitle && postData.postText && postData.tags.length>0)} variant="primary" type="submit" className="w-100 fw-bold mt-4">
              Submit
            </Button>
            </div>
            {message==="success"? <p className='text-center'>Post was created</p>: null}
            {message==='error'? <p>Unable to create post</p>: null}
          </Form>
        </Card.Body>
      </Card>
      </Col>
      </Row>
    </Container>    
  );
};

export default AdminCreatePost;


