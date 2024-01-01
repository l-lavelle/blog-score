// Drop down didnt work with clearing needed the value to useState with Array
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import  { useState } from 'react';
import { Container, Form, Button, Card, Col, Row } from 'react-bootstrap';
import './AdminCreatePost.css'
// import PlusIcon from '/src/assets/plus-sign.png' 

const AdminCreatePost = () => {
  const [addPost, {error} ] = useMutation(ADD_POST);
  const [message, setMesage]=useState('');
  const [postData, setPostData] = useState({ postTitle: '', postText: '', tags: []});
  const [tags,setTags] = useState({tags0:'', tags1:'',tags2:'',tags3:'',tags4:''})
  const [fileError, setFileError]=useState({message:'', status:''});
  // const [counter, setCounter] = useState(1);
  const [currentImageUrl, setcurrentImageUrl] = useState(null)
  const [file, setFile] = useState({myFile:''})

  const updateData = async (event)=>{
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  const updateTags = async(event)=>{
    const { name, value } = event.target;
    setTags({...tags, [name]:value})
  };

  const handleInputFileChange = async (event) =>{
    setFileError({message:'', status:''})
    const localfile = event.target.files[0]
    const fileSize=localfile.size * .001

    if (fileSize>120){
      console.log("hi")
      setFileError({message:'File size needs to be under 120KB', status:'error'})
      // console.log("tooo big")
    } else {
    setcurrentImageUrl(URL.createObjectURL(localfile))
    const base64 = await convertToBase64(localfile)
    setFile({...file, myFile:base64})
  }

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

    
    setcurrentImageUrl(null)
    } catch (error) {
      console.log(error);
    }
    setMesage( "success" );
    setTags({tags0:'', tags1:'',tags2:'',tags3:'',tags4:''});
    setPostData({
      postTitle: '',
      postText: '',
      tags:[]
    })
  };
 
  // const handleClick = () => {
  //   if (counter<5){
  //   setCounter(counter + 1);
  //   }
  // };
  

  return (
  <Container fluid={true}>
    <Row>
      <Col>
        <Card className="card-3d " id="form-create" style={{ padding: '5px' }}>
          <Card.Body>
            <Card.Title className="text-center fw-bold fs-2">Create New Blog Post</Card.Title>
            <Form onSubmit={createPost} onClick={()=>{setMesage('')}}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className='text-ad mt-3'>Blog Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Blog Title"
                    name='postTitle'
                    value={postData.postTitle}
                    onChange={updateData}
                  />
               </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className='text-ad mt-3'> Blog Text</Form.Label>
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
  
              <Form.Group controlId="formTags">
              <Form.Label className='text-ad mt-3'>Tags</Form.Label>
              {/* {Array.from(Array(counter)).map((c, index) => {
                return (
                  <Form.Control
                  key={"tags"+index}
                  type="text"
                  placeholder="add tags"
                  name={"tags"+index}
                  value={tags.}
                  onChange={updateTags}
                  className='mb-2'
                />
                )
                })} */}
                <Form.Control
                  type="text"
                  placeholder="add tags"
                  name='tags0'
                  value={tags.tags0}
                  onChange={updateTags}
                  className='mb-2'
                />
                <Form.Control
                  type="text"
                  placeholder="add tags"
                  name='tags1'
                  value={tags.tags1}
                  onChange={updateTags}
                  className='mb-2'
                />
                <Form.Control
                  type="text"
                  placeholder="add tags"
                  name='tags2'
                  value={tags.tags2}
                  onChange={updateTags}
                  className='mb-2'
                />
                <Form.Control
                  type="text"
                  placeholder="add tags"
                  name='tags3'
                  value={tags.tags3}
                  onChange={updateTags}
                  className='mb-2'
                />
                  <Form.Control
                  type="text"
                  placeholder="add tags"
                  name='tags4'
                  value={tags.tags4}
                  onChange={updateTags}
                  className='mb-2'
                />
                {/* <img className='plus-sign' src={PlusIcon} onClick={handleClick}/> */}
                </Form.Group>
              

              <Form.Label className='text-ad mt-3'>Blog Picture</Form.Label>
              <br></br>
              <input
              type="file" 
              label="Image"
              name="myFile"
              id="file-upload"
              accept=".jpeg,.png,.jpg"
              onChange={handleInputFileChange}>
              </input>
              {fileError.status==='error'?<p className='mt-3' style={{color:"red"}}>{fileError.message}</p>:null}
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


