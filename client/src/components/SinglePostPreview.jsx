import Auth from '../utils/auth';
import { Card } from 'react-bootstrap';
import HomeUpVote from './HomePage/HomeUpvote';
import HomeComments from './HomePage/HomeComments';
import { GET_SINGLE_POST} from '../utils/queries';
import { useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';

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
    <Card.Title className="mt-3 text-center">{singlePostData.postTitle}</Card.Title>
    <Card.Body>
      <p className='mb-3'>{singlePostData.postText}</p>
        <div>
          {Auth.loggedIn()?
          <div className=" mt-2 vote-btns">
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