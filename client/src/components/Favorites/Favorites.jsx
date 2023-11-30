import { Container, Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import {USER_LIKED_POSTS} from '../../utils/queries';
import HomeUpVote from '../HomePage/HomeUpvote';
import '../Recent/Recent.css';
import { useEffect , useState } from 'react';
import {truncateText} from '../../utils/helper';
import SinglePostPreview from '../SinglePostPreview';

const Favorites = () => {
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
        const defaultId= likedPostData[0]._id
        setDefaultPost(defaultId)
    }
  },[data?.userLikedPost?.likedPost, loading]);

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
      <div>
      <h3 className='text-center mb-3'style={{color:"white"}}>Favorite Posts</h3>
        <div className="laptop-container">
          <div className="laptop-posts">
            {likedPostData.map((article, index) => (
              <Card key={index} className={article._id=== singlePost ? "mb-4 class-card card-highlight" : "mb-4 class-card"} onClick={()=>getSinglePost(article._id)}>
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
    <Container>
    <h3 className='text-center mb-3'style={{color:"white"}}>Favorite Posts</h3>
    {likedPostData.length  ?  
    <>
        {likedPostData.map((article) => (
            <Card key={article._id}  className="mb-4">
              <Card.Body>
                <Card.Title>{article.postTitle}</Card.Title>
                <HomeUpVote upvotes={article.upvotes} _id={article._id}/>
                <Card.Text>{article.postText}</Card.Text>
              </Card.Body>
            </Card>
        ))}
      </>:<h4 id="favorite-error">No Favorited Posts</h4>}
    </Container>
  );
};

export default Favorites;
