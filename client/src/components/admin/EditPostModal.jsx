import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';
import {UPDATE_POST} from '../../utils/mutations';
import {DELETE_POST} from '../../utils/mutations';
import { useState } from 'react';
import {GET_POSTS} from '../../utils/queries';


const EditPostModal = (props) => {
  const [updatedData, setUpdatedData] = useState({postId: "", postTitle: props.postTitle , postText: props.postText, tags:[]});
  const [updatePost, { error }] = useMutation(UPDATE_POST, {refetchQueries:[
    GET_POSTS
  ]});

  const [deletePost] = useMutation(DELETE_POST, {refetchQueries:[
    GET_POSTS
  ]});

  // Set new value of edited post 
  const updateData= async (event)=>{
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  // update post 
  const postUpdate= async (postId, onHide)=>{
    try{
      await updatePost({
        variables: { 
          criteria:{
            postTitle: updatedData.postTitle, 
            postText: updatedData.postText
          },
          postId: postId }
      })
      if (error) {
        throw new Error('Unable to update post');
      }
      onHide()
    }catch (err){
      console.error(err)
    }
  };

// Delete the post 
  const postDelete = async (postId, onHide)=>{
    try{
      await deletePost({
        variables: { postId }
      })
      if (error) {
        throw new Error('Unable to delete post');
      }
      onHide()
    }catch (err){
      console.error(err)
    }
  };

    return (
        <Modal 
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title style={{width:"100vw"}} id="contained-modal-title-vcenter">
              <InputGroup>
                <Form.Control 
                  name='postTitle'
                  onChange={updateData}
                  value={updatedData.postTitle}
                  defaultValue= {props.title}/> 
              </InputGroup>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <InputGroup>
            <Form.Control 
            as="textarea" 
            rows={12} 
            aria-label="With textarea"  
            defaultValue={props.text}
            name='postText'
            onChange={updateData}
            value={updatedData.postText}/>  
          </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ border: "#14e956", background:"black"}} onClick={()=>postUpdate(props.postId, props.onHide)}>Update</Button>
            <Button style={{ border: "#14e956", background:"black"}} onClick={()=>postDelete(props.postId, props.onHide)}>Delete</Button>
            <Button style={{ border: "#14e956", background:"black"}} onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
};
    
  export default EditPostModal;