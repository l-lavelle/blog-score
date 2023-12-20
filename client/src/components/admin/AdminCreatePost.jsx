//tags are working make sure that able to submit and validation good 
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import  { useState } from 'react';
import { Container, Form, Button, Card, Col, Row } from 'react-bootstrap';
import './AdminCreatePost.css'

const AdminCreatePost = () => {
  const [addPost, {error} ] = useMutation(ADD_POST);
  const [message, setMesage]=useState('');
  const [postData, setPostData] = useState({ postTitle: '', postText: '', tags: [], pictureLink:''});
  const [tags,setTags] = useState({tags0:'', tags1:'',tags2:'',tags3:'',tags4:''})
  const [counter, setCounter] = useState(1);
  const [currentImageUrl, setcurrentImageUrl] = useState(null)
  const [file, setFile] = useState({myFile:''})


  const updateData = async (event)=>{
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  const updateTags = async(event)=>{
    const { name, value } = event.target;
    setTags({...tags, [name]:value})
    console.log("tags",tags)
  };

  const handleInputFileChange = async (event) =>{
    const localfile = event.target.files[0]
    setcurrentImageUrl(URL.createObjectURL(localfile))
    const base64 = await convertToBase64(localfile)
    setFile({...file, myFile:base64})

    // const newImage = document.createElement("img");
    // newImage.src=base64;
    // const form = document.getElementById("form-create")

    // const canvas = document.createElement("canvas");
    // const ctx = canvas.getContext("2d");
    
    // newImage.addEventListener("load", (e) => {
    //   canvas.width = 200;
    //   const heightE = 200/newImage.width * newImage.height
    //   if (heightE > 100){
    //     canvas.width = 100/heightE * 200
    //     canvas.height= 100
    //   } else{
    //   canvas.height = heightE
    //   }
    //   ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
    //   const dataURI = canvas.toDataURL();
    //   const image64 = dataURI;
    //   console.log("dataURI",dataURI)
    //   setFile({...file, myFile:image64})
    // });

    console.log("encode in useState",file)
  };

  function convertToBase64(file){
    return new Promise((resolve,reject)=>{
      const fileReader= new FileReader();
      // convert file into base64 format
      fileReader.readAsDataURL(file);
      fileReader.onload = () =>{
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) =>{
        reject(error)
      }
    })
  }

  const createPost = async (event) => {
    // Clean tags to send to dataBase
    const allTags = Object.values(tags);
    const cleanedTags = allTags.map(s => s.trim());
    const filteredTags = cleanedTags.filter(s=>s);

    event.preventDefault();
    try {
      await addPost({
        variables: {
          postTitle: postData.postTitle,
          postText: postData.postText,
          tags: filteredTags,
          pictureLink: file.myFile
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
        <Card className="card-3d " id="form-create" style={{ padding: '5px' }}>
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
              {/* add UUID for keys */}
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

              <input 
              type="file" 
              label="Image"
              name="myFile"
              id="file-upload"
              accept=".jpeg,.png,.jpg"
              onChange={handleInputFileChange}>
              </input>
              {currentImageUrl && (
                <div>
                  <img width={"250px"} src={currentImageUrl} alt="not found" />
                </div>
              )}

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


