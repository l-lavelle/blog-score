// import React from 'react';
import { Card } from 'react-bootstrap';

const ArticlePreview = ({ postTitle, postText }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{postTitle}</Card.Title>
        <Card.Text>{postText}</Card.Text>
        {/* anything else we want */}
      </Card.Body>
    </Card>
  );
};

export default ArticlePreview;
