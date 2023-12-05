import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';
import {UPDATE_COMMENT} from '../../utils/mutations';
import {DELETE_COMMENT} from '../../utils/mutations';
import { useState } from 'react';
// import {GET_POSTS} from '../../utils/queries';
import { Card } from 'react-bootstrap';
import {SINGLE_USER_COMMENTS} from '../../utils/queries'

const EditCommentModal = (props) => {
    console.log("props",props)
  const [updatedData, setUpdatedData] = useState({postId: "", commentText: props.commentText});

  const [updateComment, { error }] = useMutation(UPDATE_COMMENT, {refetchQueries:[
    SINGLE_USER_COMMENTS
  ]});

  const [deleteComment] = useMutation(DELETE_COMMENT, {refetchQueries:[
    SINGLE_USER_COMMENTS
  ]});

  // Set new value of edited post 
  const updateData= async (event)=>{
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
    // console.log(updatedData)
  };

  // update comment 
  const commentUpdate= async (commentId, onHide)=>{
    try{
      await updateComment({
        variables: { 
          commentText: updatedData.commentText, 
          commentId: commentId }
      })
      if (error) {
        throw new Error('Unable to update post');
      }
      onHide()
    }catch (err){
      console.error(err)
    }
  };

// Delete the comment 
  const commentDelete = async (commentId, onHide)=>{
    try{
      await deleteComment({
        variables: { commentId }
      })
      if (error) {
        throw new Error('Unable to delete post');
      }
      onHide()
    }catch (err){
      console.error(err)
    }
  };

    console.log(updateData)
    return (
        <Modal 
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title style={{width:"100vw"}} id="contained-modal-title-vcenter">
              <Card>
                <Card.Header>
                    <h4 className="mb-3">{props.postTitle}</h4>
                </Card.Header>
              </Card>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>
            {props.postText}
        </p>
        <InputGroup>
                <Form.Control 
                  name='commentText'
                  defaultValue= {props.commentText}
                  onChange={updateData}
                //   value={updatedData.commentText}
                 /> 
              </InputGroup>
              {props.commentText}
        {/* <InputGroup>
            <Form.Control 
            as="textarea" 
            rows={12} 
            aria-label="With textarea"
            defaultValue={updatedData.commentText}  
            name='commentText'
            onChange={updateData}
            value={updatedData.commentText}/>  
          </InputGroup> */}
          </Modal.Body>
          <div>
            <Button style={{ border: "#14e956", background:"red", float:"left", margin:10}} onClick={()=>commentDelete(props.commentId, props.onHide)}>Delete</Button>
            <Button style={{ border: "#14e956", background:"black",float: "right", margin:10}} onClick={props.onHide}>Close</Button>
            <Button style={{ border: "#14e956", background:"#696969",float: "right", margin:10}}onClick={()=>commentUpdate(props.commentId, props.onHide)}>Update</Button>
          </div>
        </Modal>
      );
};
    
  export default EditCommentModal;