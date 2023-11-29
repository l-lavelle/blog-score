import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';
import {ADMIN_DELETE_USER} from '../../utils/mutations'
import {GET_ROLE_USER} from '../../utils/queries'
import { useState } from 'react';

const UsersModal = (props) => {
  const [deletePost] = useMutation(ADMIN_DELETE_USER, {refetchQueries:[
    GET_ROLE_USER
  ]});
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
              Manage User 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            insert modal comments
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ border: "#14e956", background:"black"}} onClick={()=>userDelete(props.userId, props.onHide)}>Delete</Button>
            <Button style={{ border: "#14e956", background:"black"}} onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
};
    
  export default UsersModal;