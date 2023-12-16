//tags are working make sure that able to submit and validation good 
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import  { useState } from 'react';
import { Container, Form, Button, Card, Col, Row } from 'react-bootstrap';
import './AdminCreatePost.css'

const AdminCreatePost = () => {
  const [addPost, {error} ] = useMutation(ADD_POST);
  const [message, setMesage]=useState('');
  const [postData, setPostData] = useState({ postTitle: '', postText: '', tags: []});
  const [tags,setTags] = useState({tags0:'', tags1:'',tags2:'',tags3:'',tags4:''})
  const [counter, setCounter] = useState(1);

  const updateData = async (event)=>{
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  const updateTags = async(event)=>{
    const { name, value } = event.target;
    setTags({...tags, [name]:value})
    console.log("tags",tags)
  };

  const createPost = async (event) => {
    const allTags = Object.values(tags);
    const cleanedTags = allTags.map(s => s.trim());
    const filteredTags = cleanedTags.filter(s=>s);

    event.preventDefault();
    try {
      await addPost({
        variables: {
          postTitle: postData.postTitle,
          postText: postData.postText,
          tags: filteredTags
        },
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
 
  const handleClick = () => {
    if (counter<5){
    setCounter(counter + 1);
    }
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

              {/* <Form.Group controlId="formBasicEmail">
                <Form.Label className='text-ad m-3'>Tags</Form.Label>
                <p>Please seperate multiple tags with comma</p>
                <Form.Control
                  type="text"
                  placeholder="add tags"
                  name='tags'
                  value={postData.tags[0]}
                  onChange={updateData}
                />
              </Form.Group> */}

              {/* Trial for tags */}
              <Form.Group controlId="formTags">
              <Form.Label className='text-ad m-3'>Tags</Form.Label>
              {Array.from(Array(counter)).map((c, index) => {
                return (
                  <Form.Control
                  key={c}
                  type="text"
                  placeholder="add tags"
                  name={"tags"+index}
                  value={postData.tags[index]}
                  onChange={updateTags}
                  className='mb-2'
                />
                )
                })}
                </Form.Group>
                <p onClick={handleClick}>More tags</p>

              <div className="text-center">
              <Button style={{ maxWidth: '20vw',  padding: '5px', background: "#14e956" , border: "black", color:"black"}} disabled={!(postData.postTitle && postData.postText )} variant="primary" type="submit" className="w-100 fw-bold mt-4">
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


