import Auth from '../utils/auth'
import { Card } from 'react-bootstrap';
import './ArticlePreview.css'; 
import HomeUpVote from './HomePage/HomeUpvote'
import HomeComments from './HomePage/HomeComments'
import { GET_SINGLE_POST} from '../utils/queries';
import { useQuery } from '@apollo/client';

const SinglePostPreview = ({postId}) => {
    console.log(postId)

    const { data:onePost, loading } = useQuery(GET_SINGLE_POST, {
    variables: { postId: postId },
    fetchPolicy: 'cache-and-network',
    });
    const  singlePostData = onePost?.getSinglePost || []

if (loading) {
    return (
    <>
      <h1>Loading...</h1>
      {/* {Array.from({ length: 5 }, (_, index) => ({
        title: 'Loading Article ' + (index + 1),
        content: 'Loading content...',
      }))} */}
    </>
    )
}
  return (
    <>  
    <Card>
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