// find post by id 
import { Button, Card  } from 'react-bootstrap';
import Auth from '../utils/auth'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import {ADD_COMMENT, UPVOTE_POST, DOWNVOTE_POST } from '../utils/mutations'
import {GET_RECOMMENDED_POSTS, USER_LIKED_POSTS, USER_UNLIKED_POSTS} from '../utils/queries'
import './ArticlePreview.css'; 

const HomeComment = ({ _id, postTitle, postText, postComments, upvotes, downvotes}) => {
  const [updatedData, setUpdatedData] = useState({userId: "", commentText: "" })
  
  const [addComment, {error}] = useMutation(ADD_COMMENT, {
    refetchQueries: [],
  });

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
    <>
        <h5>Comments:</h5>
        {postComments.length  ?  
        <>
        {postComments.map((posts, index) => (
            <Card key={index}  className="mb-4">
            <Card.Body>
            <Card.Text>{posts.commentText}</Card.Text>
            </Card.Body>
        </Card>
        ))}
        </> : 
        <Card >
         <Card.Body>
          <Card.Text>No Comments Yet</Card.Text>
        </Card.Body>
        </Card>}
          {Auth.loggedIn()?
          <>
            <h4 className="mt-4">Add a Comment:</h4>
            <InputGroup className="mt-2">
            <Form.Control
              className="mb-2"
              name='commentText'
              onChange={updateData}
              value={updatedData.commentText}
              /> 
            </InputGroup>
            <Button style={{ background: "#14e956" , border: "black", color:"black"}} onClick={()=>commentPost(_id)}>Post Comment</Button>
          </>:[]}
    </>
  );
};

export default HomeComment;
