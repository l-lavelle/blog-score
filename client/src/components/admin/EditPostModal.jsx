import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const EditPostModal = (props) => {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             {props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <InputGroup>
          <Form.Control as="textarea" rows={10} aria-label="With textarea"  placeholder={props.text} />
          </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
};
    
  export default EditPostModal;