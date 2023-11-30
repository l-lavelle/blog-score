import Auth from '../../utils/auth';
import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './ArticlePreview.css'; 
import HomeUpVote from '../HomePage/HomeUpvote';
import HomeComments from '../HomePage/HomeComments';
import {truncateText} from '../../utils/helper';

const ArticlePreview = ({ _id, postTitle, postText, upvotes}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  let eventKey = -1

  return (
    <>
    <Accordion className="mb-4" defaultActiveKey="0"  >
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
  </Accordion>
    </>
  );
};

export default ArticlePreview;

