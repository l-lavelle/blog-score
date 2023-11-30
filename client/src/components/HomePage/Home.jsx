import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../../utils/queries';
import { useEffect , useState } from 'react';
import { Card } from 'react-bootstrap';
import '../Recent.css'
import ArticlePreview from '../ArticlePreview';
import SinglePostPreview from '../SinglePostPreview'
import {truncateText} from '../../utils/helper'

const Home = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [singlePost, setSinglePost] = useState('');
  const [defaultPost, setDefaultPost] = useState(null);

  const { loading, data } = useQuery(GET_POSTS,{
    fetchPolicy: 'cache-and-network',
  });

  const  postData = data?.posts || []

  useEffect(() => {
    if (loading) {
      null
    } else {
      const  postData = data?.posts || []
        const defaultId= postData[0]._id
        setDefaultPost(defaultId)
    }
  },[data?.posts, loading]);

  const breakpoint = 700;
  useEffect(() => {
  const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const getSinglePost = async (postId)=>{
    setSinglePost(postId)
  }

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
  
 if (width > breakpoint) {
      return (
        <div>
          <div className="laptop-container">
            <div className="laptop-posts">
              {postData.map((article, index) => (
                <Card key={index} className="mb-4 class-card" onClick={()=>getSinglePost(article._id)}>
                <Card.Body>
                  <Card.Title className="mb-3">{article.postTitle}</Card.Title>
                  <Card.Text >{truncateText(article.postText, 20)}</Card.Text>
                </Card.Body>
                </Card>
              ))}
              {Card.key===0? setDefaultPost(Card.id):[]}
            </div>
            <div id="post-preview" className="ms-5">
              {defaultPost && !singlePost? <SinglePostPreview postId={defaultPost}/>:[]}
              { singlePost ? <SinglePostPreview postId={singlePost} /> : []}
              </div>
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
};

export default Home;