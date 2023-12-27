import { useQuery } from '@apollo/client';
import { Card } from 'react-bootstrap';
import {SINGLE_USER_COMMENTS} from '../../utils/queries'
import {truncateText} from '../../utils/helper'
import { useState } from 'react';
import EditCommentModal from './ProfileEditCommentModal/EditCommentModal'
import Skeleton from 'react-loading-skeleton';

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

  if(loading){
    return (
      <div className="p-3" style={{background:"white", borderRadius:"25px"}}>
      <div className="p-1 mb-3" style={{background:"white"}}>
      <h3 className='text-center mb-3'>Comment Dashboard</h3>
      <p className="ps-3 pe-3" style={{fontSize:"1.2rem"}}>Welcome to you comment dashboard! Here you can see all of the comments that you made on blog posts. Click on one of the posts to see the entire post and edit or delete your comment.</p>
      </div>
      <div style={{background:"#cccccc", borderRadius:"20px"}} className='p-2 mb-3'>
      <h4 >Manage Comments:</h4>
      <Skeleton style={{marginBottom:"20px"}} animation="wave" height={120} count={6} />
      </div>
      </div>
    )
  }

  return (
    <div className="p-3" style={{background:"white", borderRadius:"25px"}}>
    <div className="p-1 mb-3" style={{background:"white"}}>
    <h1 className='text-center fw-bold mb-3'>Comment Dashboard</h1>
    <p className="ps-3 pe-3" style={{fontSize:"1.1rem"}}>Welcome to you comment dashboard! Here you can see all of the comments that you made on blog posts. Click on one of the posts to see the entire post and edit or delete your comment.</p>
    </div>
    <div style={{background:"#cccccc", borderRadius:"20px"}} className='p-2 mb-3'>
    <h4>Manage Comments:</h4>
    {commentData.length>0?
    <>
      {commentData.map((article, index) => (
        <Card key={index} className="mb-3" onClick={()=>openModal(article._id, article.postId.postTitle, article.postId.postText, article.commentText)}>
        <Card.Header>
          <Card.Title className="mb-3">{article.postId.postTitle}</Card.Title>
          <p>{truncateText(article.postId.postText, 20)}</p>
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
    </div>
    </div>
  );
};

export default UserComments;