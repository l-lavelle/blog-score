import { Container, Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import {FIND_FRIEND} from '../../../utils/queries';
import HomeUpVote from '../../HomePage/HomeUpvote';
import '../../Recent/Recent.css';
import { useEffect , useState } from 'react';
import {truncateText} from '../../../utils/helper';
import SinglePostPreview from '../../SinglePostPreview';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import './SingleUserProfile.css'
import 'react-loading-skeleton/dist/skeleton.css'

const SingleUserProfile = () => {
    const { id } = useParams();
    const [width, setWidth] = useState(window.innerWidth);
    const [singlePost, setSinglePost] = useState('');
    const [defaultPost, setDefaultPost] = useState(null);
    console.log("friend id", id)
    const {  loading, data } = useQuery(FIND_FRIEND,{ variables: { userId:id } });
    const  following = data?.findFriend || [];
  
    console.log("friend data",following)
    useEffect(() => {
      if (loading) {
        null
      } else {
        const  following = data?.findFriend?.posts || []
        if (following.length>0){
          const defaultId= following[0]._id 
          setDefaultPost(defaultId)
          higlightPost(defaultPost)}
      }
    },[data?.findFriend?.likedPost, loading,defaultPost]);
  
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
        <>
        <div>
          <div className='d-flex align-items-center new'>
          <img className="thumbnail-image" 
            src={following.userPictureLink} 
            alt="user pic"
          />
          <div>
            <h3 className='text-center mb-3 ms-5'style={{color:"white"}}>{following.username}</h3>
            <h3 className='text-center mb-3 ms-5'style={{color:"white"}}>{following.title}</h3>
            <p className='text-center mb-3 ms-5'style={{color:"white"}}>{following.profileInfo}</p>
          </div>
          </div>
          {following.posts.length>0?  
            <div className="laptop-container">
              <div className="laptop-posts">
              <Scrollbars className="scrollbar" autoHeight autoHeightMin={100} autoHeightMax="calc(100vh - 36px - 35px - 75px)"style={{ width: "100%"}}>
                {following.posts.map((article, index) => (
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
            </div> :
            <Card>
              <Card.Body>
                <Card.Title>User hasnt created any posts yet</Card.Title>
              </Card.Body>
            </Card> }
        </div>
        </>
      );
    }
  
    return (
      <Container>
       <div>
          <div className='d-flex flex-column'>
          <img className="thumbnail-image" 
            src={"https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} 
            alt="user pic"
          />
          <h3 className='text-center mb-3'style={{color:"white"}}>{following.username}</h3>
          <h3 className='text-center mb-3'style={{color:"white"}}>{following.title}</h3>
          <p className='text-center mb-3'style={{color:"white"}}>{following.profileInfo}</p>
          </div>
       </div>
      <h3 className='text-center mb-3'style={{color:"white"}}>Favorite Posts</h3>
      {following.posts.length>0 ? 
        <>
          {following.posts.map((article) => (
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
           <Card.Text>User hasnt created any posts yet</Card.Text>
         </Card.Body>
       </Card> }
      </Container>
    );
};

export default SingleUserProfile;