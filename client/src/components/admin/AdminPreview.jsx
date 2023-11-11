
import { Card } from 'react-bootstrap';

const AdminPreview = ({ postTitle, postText, _id }) => {


  return (
    <div >
    <Card className="mb-3" id={_id}>
      <Card.Body>
        <Card.Title>{postTitle}</Card.Title>
        <Card.Text>{postText}</Card.Text>
      </Card.Body>
    </Card>
    </div>
  );
};

export default AdminPreview;