// way to pass default value
import { useQuery } from '@apollo/client';
import { RECENT_POSTS_QUERY} from '../utils/queries';
import { useEffect , useState} from 'react';
import { Card } from 'react-bootstrap';
import './Recent.css'
import ArticlePreview from './ArticlePreview';
import SinglePostPreview from './SinglePostPreview'

function RecentlyViewedPosts() {
  const [width, setWidth] = useState(window.innerWidth);
  const [singlePost, setSinglePost] = useState('');
  const { loading, data:recentData } = useQuery(RECENT_POSTS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const  postData = recentData?.recentPosts || []
  
  const breakpoint = 700;
  useEffect(() => {
   const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const getSinglePost = async (postId)=>{
    console.log(postId)
    setSinglePost(postId)
  }

  if (width > breakpoint) {
    return (
      <div>
        <h3>Component 1</h3>
        <p>Current width is {width} px</p>
        <div className="laptop-container">
          <div className="laptop-posts">
            {postData.map((article, index) => (
              <Card key={index}  className="mb-4" onClick={()=>getSinglePost(article._id)}>
              <Card.Body>
                <Card.Title>{article.postTitle}</Card.Title>
                {/* <HomeUpVote upvotes={article.upvotes} _id={article._id}/> */}
                <Card.Text>{article.postText}</Card.Text>
              </Card.Body>
              </Card>
            ))}
          </div>
            { singlePost ? <SinglePostPreview postId={singlePost} /> :[]}
        </div>
      </div>
    );
  }
  return (
    <div className="main-content">
    {postData.map((article, index) => (
      <ArticlePreview key={index} {...article} />
    ))}
  </div>
  );
}

export default RecentlyViewedPosts;
