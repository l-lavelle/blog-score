import { Button, Card  } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {ADMIN_DELETE_USER} from '../../utils/mutations'
import {GET_ROLE_USER} from '../../utils/queries'
import { Scrollbars } from 'react-custom-scrollbars-2';
import './UsersModal.css';

const UsersModal = (props) => {
  const [singlePost, setSinglePost] = useState('');
  const [adminDelete, { error }] = useMutation(ADMIN_DELETE_USER, {refetchQueries:[
    GET_ROLE_USER,
  ]});

// Delete the post 
  const userDelete = async (userId, onHide)=>{
    try{
      await adminDelete({
        variables: { userId }
      })
      if (error) {
        throw new Error('Unable to delete post');
      }
      onHide()
    }catch (err){
      console.error(err)
    }
  };

  const getSinglePost = async (commentId)=>{
    setSinglePost(commentId)
  };

  const deleteComment=()=>{

  }

    return (
        <Modal 
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title style={{width:"100vw"}} id="contained-modal-title-vcenter">
               {props.username}&apos;s Comments
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Scrollbars style={{ width: "100%", height: 300 }}>
            {props.comments.length >0 ? 
            props.comments.map((comment, index) => (
              <Card key={index} className="mb-2">
                <Card.Body onClick={()=>getSinglePost(comment._id)} >
                {comment.commentText}
                </Card.Body>  
                {/* <Button onClick={deleteComment} className={comment._id=== singlePost ? "post-card" : "post-card commentBtn-hide"}>Delete Comment</Button>        */}
                </Card>
            )):[]}
            </Scrollbars>  
          </Modal.Body>
          <div>
            <Button  style={{ border: "#14e956", background:"red", float:"left", margin:10}} onClick={()=>userDelete(props.userId, props.onHide)}>Delete User</Button>
            <Button  style={{ border: "#14e956", background:"black", float: "right", margin:10}} onClick={props.onHide}>Close</Button>
          </div>
        </Modal>
      );
};
    
  export default UsersModal;