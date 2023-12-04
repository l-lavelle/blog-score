import { Button, Card  } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/client';
import {ADMIN_DELETE_USER} from '../../utils/mutations'
import {GET_ROLE_USER} from '../../utils/queries'
import { Scrollbars } from 'react-custom-scrollbars-2';

const UsersModal = (props) => {

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
                <Card.Body className="post-card">
                {comment.commentText}
                </Card.Body>         
                </Card>
            )):[]}
            </Scrollbars>  
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ border: "#14e956", background:"red"}} onClick={()=>userDelete(props.userId, props.onHide)}>Delete User</Button>
            <div className="text-left">
            <Button  style={{ border: "#14e956", background:"black"}} onClick={props.onHide}>Close</Button>
            </div>
          </Modal.Footer>
        </Modal>
      );
};
    
  export default UsersModal;