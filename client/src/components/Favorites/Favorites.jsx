// When delete bottom fav doesnt update single profile
import { Container, Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import {USER_LIKED_POSTS} from '../../utils/queries';
import HomeUpVote from '../HomePage/HomeUpvote';
import '../Recent/Recent.css';
import { useEffect , useState } from 'react';
import {truncateText} from '../../utils/helper';
import SinglePostPreview from '../SinglePostPreview';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Favorites = () => {
  const [query, setQuery] = useState("")
  const [width, setWidth] = useState(window.innerWidth);
  const [singlePost, setSinglePost] = useState('');
  const [defaultPost, setDefaultPost] = useState(null);

  const {  loading, data } = useQuery(USER_LIKED_POSTS);
  const  likedPostData = data?.userLikedPost?.likedPost || [];

  useEffect(() => {
    if (loading) {
      null
    } else {
      const  likedPostData = data?.userLikedPost?.likedPost || []
      if (likedPostData.length>0){
        const defaultId= likedPostData[0]._id 
        setDefaultPost(defaultId)
        higlightPost(defaultPost)}
    }
  },[data?.userLikedPost?.likedPost, loading,defaultPost]);

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
  };

  if (loading) {
    if (width > breakpoint){
      return (
      <>
        <h3 className='text-center mb-3'style={{color:"white"}}>Favorites</h3>
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
        <h3 className='text-center mb-3'style={{color:"white"}}>Favorites</h3>
        <Skeleton style={{marginBottom:"20px"}} animation="wave" height={120} count={6} />
      </>
    )
  }

  if (width > breakpoint) {
    return (
      <div>
        <h3 className='text-center mb-3'style={{color:"white"}}>Favorite Posts</h3>
        <div className='searchBar-position'>
          <input className="searchBar-style" placeholder="Search for Blog Post" onChange={event => setQuery(event.target.value)} />
        </div>
        {likedPostData.length>0?  
          <div className="laptop-container">
            <div className="laptop-posts">
            <Scrollbars className="scrollbar" autoHeight autoHeightMin={100} autoHeightMax="calc(100vh - 36px - 35px - 75px)"style={{ width: "100%"}}>
              {likedPostData.filter(post => {
              if (query === '') {
                return post;
              } else if (post.postTitle.toLowerCase().includes(query.toLowerCase())) {
                return post;
              }
            }).map((article, index) => (
                <Card key={index} className={higlightPost(article._id)} onClick={()=>getSinglePost(article._id)}>
                  <Card.Body className="post-card">
                    {article.pictureLink?<img src={article.pictureLink} className='scroll-pic'/>:[]}
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
          </div> :
          <Card>
            <Card.Body>
              <Card.Title>No Favorites Yet</Card.Title>
              <Card.Text>Check out blog posts and like to save to favorites</Card.Text>
            </Card.Body>
          </Card> }
      </div>
    );
  }

  return (
    <Container>
    <h3 className='text-center mb-3'style={{color:"white"}}>Favorite Posts</h3>
    <div className='searchBar-position'>
      <input className="searchBar-style" placeholder="Search for Blog Post" onChange={event => setQuery(event.target.value)} />
    </div>
    {likedPostData.length>0 ? 
      <>
       {likedPostData.filter(post => {
              if (query === '') {
                return post;
              } else if (post.postTitle.toLowerCase().includes(query.toLowerCase())) {
                return post;
              }
            }).map((article) => (
          <Card key={article._id}  className="mb-4">
            <Card.Body>
              <Card.Title>{article.postTitle}</Card.Title>
              <HomeUpVote upvotes={article.upvotes} _id={article._id}/>
              <Card.Text>{article.postText}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </>:
       <Card>
       <Card.Body>
         <Card.Title>No Favorites Yet</Card.Title>
         <Card.Text>Check out blog posts and like to save to favorites</Card.Text>
       </Card.Body>
     </Card> }
    </Container>
  );
};

export default Favorites;
