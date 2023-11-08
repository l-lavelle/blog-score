import React from 'react';
import { Card } from 'react-bootstrap';

const ArticlePreview = ({ title, summary }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{summary}</Card.Text>
        {/* anything else we want */}
      </Card.Body>
    </Card>
  );
};

export default ArticlePreview;
