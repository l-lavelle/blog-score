// import React from 'react';
import { Card } from 'react-bootstrap';
import Auth from '../utils/auth'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {ADD_COMMENT} from '../utils/mutations'
import {GET_POSTS} from '../utils/queries'

const ArticlePreview = ({ _id, postTitle, postText, postComments }) => {
  const [updatedData, setUpdatedData] = useState({userId: "", commentText: "" })
  const [addComment, {error}] = useMutation(ADD_COMMENT, {refetchQueries:[
    GET_POSTS
  ]});

  const updateData= async (event)=>{
    const { name, value } = event.target;
    setUpdatedData({ ...updatedData, [name]: value });
  }

  const commentPost = async(postId)=>{
    try{
      await addComment({
        variables: { 
          commentText: updatedData.commentText,
          postId:postId
          }
      })
      if (error) {
        throw new Error('Unable to update post');
      }
    }catch (err){
      console.error(err)
    }
  }
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{postTitle}</Card.Title>
        <Card.Text>{postText}</Card.Text>
        {/* anything else we want */}
        <div>
          {postComments.map((posts, index) => (
          <li>{posts.commentText}</li>
        
        ))}
          {Auth.loggedIn()?
          <>
          <InputGroup>
          <Form.Control 
            name='commentText'
            onChange={updateData}
            value={updatedData.commentText}
            /> 
        </InputGroup>
        <button onClick={()=>commentPost(_id)}>Post Comment</button>
        </>:[]}
      </div>
      </Card.Body>
    </Card>
    
  );
};

export default ArticlePreview;
