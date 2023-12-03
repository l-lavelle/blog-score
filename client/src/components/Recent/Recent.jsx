import { useQuery } from '@apollo/client';
import { RECENT_POSTS_QUERY} from '../../utils/queries';
import { useEffect , useState } from 'react';
import { Card,Container, Row, Col } from 'react-bootstrap';
import './Recent.css';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import SinglePostPreview from '../SinglePostPreview';
import {truncateText} from '../../utils/helper';
import { Scrollbars } from 'react-custom-scrollbars-2';

function RecentlyViewedPosts() {
  const [width, setWidth] = useState(window.innerWidth);
  const [singlePost, setSinglePost] = useState('');
  const [defaultPost, setDefaultPost] = useState(null);

  const { loading, data:recentData } = useQuery(RECENT_POSTS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  const  postData = recentData?.recentPosts || [];
  
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
        <Container float> 
         <Row> 
         <Col> 
        <div>
          <h3 className='text-center mb-3'style={{color:"white"}}>Recent Posts</h3>
          <div className="laptop-container">
            <div className="laptop-posts">
            <Scrollbars className="scrollbar" autoHeight autoHeightMin={100} autoHeightMax="calc(100vh - 36px - 35px - 75px)"style={{ width: "100%"}}>
              {postData.map((article, index) => (
                <div  key={index} className={article._id=== singlePost ? "mb-4 card class-card card-highlight scroll-m" : "mb-4 card class-card scroll-m"} onClick={()=>getSinglePost(article._id)}>
                <Card.Body className="post-card">
                  <Card.Title className="mb-3">{article.postTitle}</Card.Title>
                  <Card.Text >{truncateText(article.postText, 20)}</Card.Text>
                </Card.Body>
                </div>
              ))}
              {Card.key===0? setDefaultPost(Card.id):[]}
              </Scrollbars>
           </div>
          
            <div id="post-preview" >
              {defaultPost && !singlePost? <SinglePostPreview postId={defaultPost}/>:[]}
              { singlePost ? <SinglePostPreview postId={singlePost} /> : []}
              </div>
          </div>
        </div>
        </Col>
        </Row> 
        </Container> 
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
