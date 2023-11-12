
// import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import {ADD_COMMENT, UPVOTE_POST,  } from '../utils/mutations'
import {GET_POSTS,USER_LIKED_POSTS} from '../utils/queries'

const ArticlePreview = ({ _id, postTitle, postText, postComments, upvotes,downvotes }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [buttonDisable, setbuttonDisable] = useState("primary");
  const [updatedData, setUpdatedData] = useState({userId: "", commentText: "" })
  
  const [addComment, {error}] = useMutation(ADD_COMMENT, {refetchQueries:[
    GET_POSTS
  ]});
  const [upvotePost] = useMutation(UPVOTE_POST)

  const { loading, data } = useQuery(USER_LIKED_POSTS);
  const  likedPostData = data?.userLikedPost?.likedPost || []
  console.log(likedPostData)

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

  const upvote = async (postId) => {
    console.log(postId)
    try{
      await upvotePost({
        variables: { postId:postId }
      })
      if (error) {
        throw new Error('Unable to update post');
      }
    }catch (err){
      console.error(err)
    }
  };

  const downvote = () => {
    console.log(3)
  };


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
        {isExpanded?
        <div>
          <Button onClick={()=>upvote(_id)} variant={buttonDisable}> Upvote
          </Button>
          <p>{upvotes}</p>
          <Button onClick={downvote} variant="primary"> Downvote
          </Button>
          <p>{downvotes}</p>
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
      </div>:<></>}
      </Card.Body>
    </Card>
    
  );
};

export default ArticlePreview;
