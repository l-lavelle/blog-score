import { useQuery } from '@apollo/client';
import { useEffect , useState } from 'react';
import { Card } from 'react-bootstrap';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import SinglePostPreview from '../SinglePostPreview'
import {truncateText} from '../../utils/helper'
import { Scrollbars } from 'react-custom-scrollbars-2';
import {SINGLE_USER} from '../../utils/queries';
import MainContent from '../MainContent';
import '../Recent/Recent.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Feed = () => {
  const [query, setQuery] = useState("")

  const { loading, data } = useQuery(SINGLE_USER, {
    fetchPolicy: 'cache-and-network',
  });
  const  allFriends = data?.singleUser?.friends || [];
  
  const [width, setWidth] = useState(window.innerWidth);
  const [singlePost, setSinglePost] = useState('');
  const [defaultPost, setDefaultPost] = useState(null);

  const filteredUserPosts = allFriends.filter(post => {
    if (post?.role === 'user') {
        return post
    } 
    });
    const friendsPosts=[]
     filteredUserPosts.forEach(function(fruit) {
        friendsPosts.push(fruit.posts);
    });
    const friendsPostFlat=friendsPosts.flat(1)
    
  useEffect(() => {
    if (loading) {
      null
    } else if (friendsPostFlat.length>0){
        const defaultId= friendsPostFlat[0]._id
        setDefaultPost(defaultId)
        higlightPost(defaultPost)
    }
  },[loading, defaultPost]);

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
    console.log(singlePost)
  }

  if (loading) {
    if (width > breakpoint){
    return (
    <>
      <h3 className='text-center mb-3'style={{color:"white"}}>Feed</h3>
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
        <h3 className='text-center mb-3'style={{color:"white"}}>Feed</h3>
        <Skeleton style={{marginBottom:"20px"}} animation="wave" height={120} count={6} />
      </>
    )
  }

  if (width > breakpoint) {
    return (
      <div>
        {filteredUserPosts.length>0 ?
        <>
        <h3 className='text-center mb-3'style={{color:"white"}}>Feed</h3>
        <div className='searchBar-position'>
            <input className="searchBar-style" placeholder="Search for Blog Post" onChange={event => setQuery(event.target.value)}/>
        </div>
        <div className="laptop-container">
          <div className="laptop-posts">
          <Scrollbars className="scrollbar" autoHeight autoHeightMin={100} autoHeightMax="calc(100vh - 36px - 35px - 75px)"style={{ width: "100%"}}>
            {friendsPostFlat
            .filter(post => {
            if (query === '') {
                return post;
            } else if (post.postTitle.toLowerCase().includes(query.toLowerCase())) {
               return post;
            }
          })
          .map((article, index) => (
              <Card key={index} className={higlightPost(article._id)} onClick={()=>getSinglePost(article._id)}>
              <Card.Body className="post-card">
                {article.pictureLink?<img src={article.pictureLink} className='scroll-pic'/>:[]}
                <Card.Title className="mb-3 text-center">{article.postTitle}</Card.Title>
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
        </>:
        <>
        <h5 className="text-center mt-3" style={{ background: "white" , border: "black", padding:"20px", borderRadius:"25px"}}>
        Friends have not posted yet. Check out content from our creators for now</h5>
            <MainContent/>
        </>
        }
      </div>
    );
  }
  return (
    <div className="main-content">
     {filteredUserPosts.length>0 ? 
     <>
     <h3 className='text-center mb-3'style={{color:"white"}}>Favorites</h3>
     <div className='searchBar-position'>
        <input className="searchBar-style" placeholder="Search for Blog Post" onChange={event => setQuery(event.target.value)}/>
      </div>
      {friendsPostFlat.filter(post => {
            if (query === '') {
                return post;
            } else if (post.postTitle.toLowerCase().includes(query.toLowerCase())) {
               return post;
            }
          }).map((article, index) => (
        <ArticlePreview key={index} {...article} />
      ))}
      </>:
      <>
      <h5 className="text-center mt-3" style={{ background: "white" , border: "black", padding:"20px", borderRadius:"25px"}}>
        Friends have not posted yet. Check out content from our creators for now</h5>
      <MainContent/>
      </>
    }
    </div>
  );
};

export default Feed;