import { useQuery } from '@apollo/client';
import { RECENT_POSTS_QUERY} from '../../utils/queries';
import { useEffect , useState } from 'react';
import { Card,Container, Row, Col } from 'react-bootstrap';
import './Recent.css';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import SinglePostPreview from '../SinglePostPreview';
import {truncateText} from '../../utils/helper';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function RecentlyViewedPosts() {
  const [query, setQuery] = useState("")
  const [width, setWidth] = useState(window.innerWidth);
  const [singlePost, setSinglePost] = useState('');
  const [defaultPost, setDefaultPost] = useState('');
  console.log("defaultPost", defaultPost)
  const { loading, data:recentData } = useQuery(RECENT_POSTS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  const  postData = recentData?.recentPosts || [];
  console.log(postData)
  useEffect(() => {
    if (loading) {
      null
    } else {
      const  postData = recentData?.recentPosts || []
        const defaultId= postData[0]._id
        setDefaultPost(defaultId)
        higlightPost(defaultPost)
    }
  },[recentData?.recentPosts, loading, defaultPost]);

    const breakpoint = 700;
    useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResizeWindow);
      return () => {
        window.removeEventListener("resize", handleResizeWindow);
      };
    }, []);

    const higlightPost=(id)=>{
      if (id===defaultPost && !singlePost){
        return("mb-4 card class-card card-highlight scroll-m")
      } else if(id===singlePost){
        return("mb-4 card class-card card-highlight scroll-m")
      } 
      else{
        return ("mb-4 card class-card scroll-m")
      }
    };
    
    const getSinglePost = async (postId)=>{
      setSinglePost(postId)
    };

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
        <Container > 
         <Row> 
         <Col> 
          <div>
            <h3 className='text-center mb-3'style={{color:"white"}}>Recent Posts</h3>
          <div className='searchBar-position'>
             <input className="searchBar-style" placeholder="Search for Blog Post" onChange={event => setQuery(event.target.value)} />
          </div>
            <div className="laptop-container">
              <div className="laptop-posts">
              <Scrollbars className="scrollbar" style={{ width: "100%"}}>
                { postData.filter(post => {
                  if (query === '') {
                    return post;
                  } else if (post.postTitle.toLowerCase().includes(query.toLowerCase())) {
                    return post;
                  }
                })
                .map((article, index) => (
                  <div  key={index} className={higlightPost(article._id)} onClick={()=>getSinglePost(article._id)}>
                  <Card.Body className="post-card">
                    {article.pictureLink?<img src={article.pictureLink} className='scroll-pic'/>:[]}
                    <Card.Title className="mb-3 text-center">{article.postTitle}</Card.Title>
                    {/* <Card.Text>By {article.author.displayName}</Card.Text>
                    <Card.Text>{new Date(parseInt(article.createdAt)).toLocaleDateString()}</Card.Text> */}
                    <Card.Text >{truncateText(article.postText, 20)}</Card.Text>
                  </Card.Body>
                  </div>
                ))}
                {Card.key===0? setDefaultPost(Card.id):[]}
              </Scrollbars>
           </div>
          
            <div id="post-preview">
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
        <h3 className='text-center mb-3'style={{color:"white"}}>Recent Posts</h3>
        <div className='searchBar-position'>
             <input className="searchBar-style" placeholder="Search for Blog Post" onChange={event => setQuery(event.target.value)} />
        </div>
        {postData.filter(post => {
          if (query === '') {
            return post;
          } else if (post.postTitle.toLowerCase().includes(query.toLowerCase())) {
            return post;
          }
        }).map((article, index) => (
          <ArticlePreview key={index} {...article} />
        ))}
      </div>
    ); 
}

export default RecentlyViewedPosts;
