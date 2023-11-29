import { useQuery } from '@apollo/client';
import { RECENT_POSTS_QUERY} from '../utils/queries';
import { useEffect , useState } from 'react';
import { Card } from 'react-bootstrap';
import './Recent.css'
import ArticlePreview from './ArticlePreview';
import SinglePostPreview from './SinglePostPreview'

function RecentlyViewedPosts() {
  const [width, setWidth] = useState(window.innerWidth);
  const [singlePost, setSinglePost] = useState('');
  const [defaultPost, setDefaultPost] = useState(null);
  // console.log(server)
  const { loading, data:recentData } = useQuery(RECENT_POSTS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  const  postData = recentData?.recentPosts || []
  
  useEffect(() => {
    if (loading) {
      null
    } else {
      const  postData = recentData?.recentPosts || []
        const defaultId= postData[0]._id
        setDefaultPost(defaultId)
    }
  },[recentData?.recentPosts, loading]);

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

    
    const truncateText =  (text, wordLimit) => {
      const words = text.split(' ');
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
      }
      return text;
    };

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
          <h3 className='text-center mb-3'style={{color:"white"}}>Recent Posts</h3>
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
}

export default RecentlyViewedPosts;
