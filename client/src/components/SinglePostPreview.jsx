import Auth from '../utils/auth';
import { Card } from 'react-bootstrap';
import HomeUpVote from './HomePage/HomeUpvote';
import HomeComments from './HomePage/HomeComments';
import { GET_SINGLE_POST} from '../utils/queries';
import { useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import'./SinglePostPreview.css'

const SinglePostPreview = ({postId}) => {

  const { data:onePost, loading } = useQuery(GET_SINGLE_POST, {
  variables: { postId: postId },
  fetchPolicy: 'cache-and-network',
  });
  const  singlePostData = onePost?.getSinglePost || [];

  if (loading) {
    return (
    <>
       <Skeleton style={{marginBottom:"20px"}} animation="wave" height={420} count={1} />
    </>
    )
  }
    
  return (
    <>  
    <Card className="mt-3">
    {singlePostData.pictureLink?<img className="singlePost-img mt-3"src={singlePostData.pictureLink} width="300"/>:[]}
    <Card.Title className="mt-3 text-center singlePost-Title">{singlePostData.postTitle}</Card.Title>
    {/* <Card.Text className='singlePost-author'>Author: {singlePostData.author.username}</Card.Text> */}
    <Card.Text className='singlePost-date'>{new Date(parseInt(singlePostData.createdAt)).toLocaleDateString()}</Card.Text>
    <div style={{ borderTop: "2px solid black ", marginLeft: 20, marginRight: 20 }}></div>
    <Card.Body>
      <p className='mb-3'>{singlePostData.postText}</p>
        <div>
          {Auth.loggedIn()?
          <div className="vote-btns">
            <div className='me-2'>
            <HomeUpVote upvotes={singlePostData.upvotes} _id={singlePostData._id}/>
            </div>
          </div>
          :[]}
          <HomeComments postId={singlePostData._id}/>
        </div>
    </Card.Body>
    </Card>
    </>
  );
};

export default SinglePostPreview;