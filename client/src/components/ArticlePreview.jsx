// import React from 'react';
import { Card } from 'react-bootstrap';
import Auth from '../utils/auth'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
const ArticlePreview = ({ postTitle, postText, postComments }) => {

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{postTitle}</Card.Title>
        <Card.Text>{postText}</Card.Text>
        {/* anything else we want */}
        <div>
          {postComments.map((posts, index) => (
          <li>{posts.commentText} </li>
        
        ))}
          {Auth.loggedIn()?
          <>
          <InputGroup>
          <Form.Control 
            name='postTitle'
            // onChange={updateData}
            // value={updatedData.postTitle}
            // defaultValue= {props.title}
            /> 
        </InputGroup>
        <button>Post Comment</button>
        </>:[]}
      </div>
      </Card.Body>
    </Card>
    
  );
};

export default ArticlePreview;
