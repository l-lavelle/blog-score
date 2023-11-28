import Auth from '../utils/auth'
import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import './ArticlePreview.css'; 
import HomeUpVote from './HomePage/HomeUpvote'
import HomeComments from './HomePage/HomeComments'
import { RECENT_POSTS_QUERY, GET_SINGLE_POST} from '../utils/queries';
import { useQuery } from '@apollo/client';
const SinglePostPreview = ({postId}) => {
    console.log(postId)

    const { data:onePost, loading } = useQuery(GET_SINGLE_POST, {
    variables: { postId: postId },
    fetchPolicy: 'cache-and-network',
    });
    const  singlePostData = onePost?.getSinglePost || []
    console.log(singlePostData)
//   const [isExpanded, setIsExpanded] = useState(false);
  

//   const truncateText = (text, wordLimit) => {
//     const words = text.split(' ');
//     if (words.length > wordLimit) {
//       return words.slice(0, wordLimit).join(' ') + '...';
//     }
//     return text;
//   };

//   const toggleText = () => {
//     setIsExpanded(!isExpanded);
//   };

//   let eventKey = -1

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
    <h1>{postId}</h1>
    {/* <Accordion.Body>
      {singlePostData.postText}
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
      </Accordion.Body> */}

    {/* <Accordion className="mb-4" defaultActiveKey="0"  >
    <Accordion.Item eventKey={eventKey+1} >
      <Accordion.Header onClick={toggleText}>
      <div className="mb-3 postTitle"> {postTitle}</div>
      <div >{isExpanded ? '' : truncateText(postText, 20)}</div>
      </Accordion.Header>
      <Accordion.Body>
      {postText}
        <div>
          {Auth.loggedIn()?
          <div className=" mt-2 vote-btns">
            <div className='me-2'>
            <HomeUpVote upvotes={upvotes} _id={_id}/>
            </div>
          </div>
          :[]}
          <HomeComments postId={_id}/>
      </div>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion> */}
    </>
  );
};

export default SinglePostPreview;