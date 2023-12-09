import { useQuery } from '@apollo/client';
import { useEffect , useState } from 'react';
import {GET_RECOMMENDED_POSTS} from '../utils/queries'
import { Card } from 'react-bootstrap';
import ArticlePreview from './ArticlePreview/ArticlePreview';
import SinglePostPreview from './SinglePostPreview'
import {truncateText} from '../utils/helper'
import { Scrollbars } from 'react-custom-scrollbars-2';
import './Recent/Recent.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MainContent = () => {
  
  const [width, setWidth] = useState(window.innerWidth);
  const [singlePost, setSinglePost] = useState('');
  const [defaultPost, setDefaultPost] = useState(null);

  const { loading, data } = useQuery(GET_RECOMMENDED_POSTS,{
    fetchPolicy: 'cache-and-network',
  });

  const  postData = data?.getRecommendedPosts || []
 
  useEffect(() => {
    if (loading) {
      null
    } else {
      const  postData = data?.getRecommendedPosts || []
        const defaultId= postData[0]._id
        setDefaultPost(defaultId)
        higlightPost(defaultPost)
    }
  },[data?.getRecommendedPosts, loading, defaultPost]);

  const breakpoint = 700;
  useEffect(() => {
  const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const higlightPost = (id) => {
    if (id === defaultPost && !singlePost) {
      return "mb-4 card class-card card-highlight scroll-m";
    } else if (id === singlePost) {
      return "mb-4 card class-card card-highlight scroll-m";
    } else {
      return "mb-4 card class-card scroll-m";
    }
  };

  const getSinglePost = async (postId)=>{
    setSinglePost(postId)
  }

  if (loading) {
    if (width > breakpoint){
    return (
    <>
      <h3 className='text-center mb-3'style={{color:"white"}}>Recent Posts</h3>
      <div className='laptop-container'>
        <div className="laptop-posts">
          <Skeleton className="mb-4" animation="wave" height={120} count={6} />
        </div>
        <div id="post-preview">
          <Skeleton style={{marginBottom:"20px"}} animation="wave" height={420} count={1} />
        </div>
      </div>
    </>
    )
  }
    return (
      <>
        <h3 className='text-center mb-3'style={{color:"white"}}>Recent Posts</h3>
        <Skeleton style={{marginBottom:"20px"}} animation="wave" height={120} count={6} />
      </>
    )
  }

  if (width > breakpoint) {
    return (
      <div>
        <div className="laptop-container">
          <div className="laptop-posts">
          <Scrollbars className="scrollbar" autoHeight autoHeightMin={100} autoHeightMax="calc(100vh - 36px - 35px - 75px)"style={{ width: "100%"}}>
            {postData.map((article, index) => (
              <Card key={index} className={higlightPost(article._id)} onClick={()=>getSinglePost(article._id)}>
              <Card.Body className="post-card">
                <Card.Title className="mb-3">{article.postTitle}</Card.Title>
                <Card.Text >{truncateText(article.postText, 20)}</Card.Text>
              </Card.Body>
              </Card>
            ))}
            {Card.key===0? setDefaultPost(Card.id):[]}
            </Scrollbars>
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

export default MainContent;
