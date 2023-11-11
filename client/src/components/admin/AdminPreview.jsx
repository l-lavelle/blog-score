
import { Card } from 'react-bootstrap';

const AdminPreview = ({ postTitle, postText }) => {


  return (
    <div >
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{postTitle}</Card.Title>
        <Card.Text>{postText}</Card.Text>
      </Card.Body>
    </Card>
    </div>
  );
};

export default AdminPreview;