import  { useState } from 'react';
import { useQuery } from '@apollo/client';
import { RECENT_POSTS_QUERY } from '../utils/queries';
import Accordion from 'react-bootstrap/Accordion'

function RecentlyViewedPosts() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { loading, error, data } = useQuery(RECENT_POSTS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  console.log(data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

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
    <>
    <h1>Recently Posts</h1>
    {data.recentPosts.map((post, index) => (
      <Accordion  key={post._id} className="mb-4" defaultActiveKey="0" >
        <Accordion.Item eventKey={index} >
            <Accordion.Header onClick={toggleText}>
              <div className="mb-3 postTitle"> {post.postTitle}</div>
              <div >{isExpanded ? '' : truncateText(post.postText, 20)}</div>
            </Accordion.Header>
            <Accordion.Body>
              {post.postText}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
    ))}
    </>
  );
}

export default RecentlyViewedPosts;
