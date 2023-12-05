import { useQuery } from '@apollo/client';
import { Container, Form, Button, Card } from 'react-bootstrap';
import {SINGLE_USER_COMMENTS} from '../../utils/queries'
import {truncateText} from '../../utils/helper'
import { useState } from 'react';
import EditCommentModal from './EditCommentModal'

const UserComments = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({commentId: "", postTitle:"" , postText: "", commentText:""});

  const { loading, data } = useQuery(SINGLE_USER_COMMENTS,{
    fetchPolicy: 'cache-and-network',
  });

  const commentData=data?.singleUserComments?.comments || []
 
  const openModal = async (commentId, postTitle, postText, commentText) =>{
    await setModalData({commentId, postTitle, postText, commentText})
    setModalShow(true)
  };

  return (
    <>
    <h3 className='text-center mb-3'style={{color:"white"}}>Manage Comments</h3>
    {commentData.length>0?
    <>
      {commentData.map((article, index) => (
        <Card key={index} className="mb-3" onClick={()=>openModal(article._id, article.postId.postTitle, article.postId.postText, article.commentText)}>
        <Card.Header>
          <Card.Title className="mb-3">{article.postId.postTitle}</Card.Title>
          <p className="mb-3">{truncateText(article.postId.postText, 20)}</p>
        </Card.Header>
        <Card.Body>
          <Card.Text>
          {article.commentText}
          </Card.Text>
        </Card.Body>
        </Card>
      ))}
    </>:
    <Card>
       <Card.Body>
         <Card.Title>No Comments Yet</Card.Title>
         <Card.Text>Read through the blogs and add your thoughts</Card.Text>
       </Card.Body>
     </Card>
     }
    <EditCommentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        commentId={modalData.commentId}
        postTitle={modalData.postTitle}
        postText={modalData.postText}
        commentText={modalData.commentText}
      />
    </>
  );
};

export default UserComments;