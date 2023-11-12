import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const ArticlePreview = ({ postTitle, postText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{postTitle}</Card.Title>
        <Card.Text>
          {isExpanded ? postText : truncateText(postText, 20)}
        </Card.Text>
        <Button onClick={toggleText} variant="primary">
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
        {/* anything else we want */}
      </Card.Body>
    </Card>
  );
};

export default ArticlePreview;
