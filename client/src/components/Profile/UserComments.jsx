// import { useMutation } from '@apollo/client';
// import {LOGIN} from '../../utils/mutations';
// import  { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Form, Button, Card } from 'react-bootstrap';
import {SINGLE_USER_COMMENTS} from '../../utils/queries'
import {truncateText} from '../../utils/helper'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
// import './Login.css';
import Auth from '../../utils/auth';
import EditCommentModal from './EditCommentModal'

const UserComments = () => {
  // const userId= Auth.getProfile().data._id
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
    <h3 className='text-center mb-3'style={{color:"white"}}>Favorite Posts</h3>
   {commentData.map((article, index) => (
      <Card key={index} className="mb-3" onClick={()=>openModal(article._id, article.postId.postTitle, article.postId.postText, article.commentText)}>
      <Card.Header>
        <Card.Title className="mb-3">{article.postId.postTitle}</Card.Title>
        <p className="mb-3">{truncateText(article.postId.postText, 20)}</p>
        {/* {article.postId.postText !=null ?<Card.Text>{truncateText(article.postId.postText, 20)}</Card.Text>:[]} */}
      </Card.Header>
      <Card.Body>
        <Card.Text>
        {article.commentText}
        </Card.Text>
      </Card.Body>
      </Card>
    ))}
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