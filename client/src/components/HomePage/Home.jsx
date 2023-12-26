import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../../utils/queries';
import { useEffect , useState } from 'react';
import { Card } from 'react-bootstrap';
import '../Recent/Recent.css';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import SinglePostPreview from '../SinglePostPreview';
import {truncateText} from '../../utils/helper';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../HomePage/SearchBar.css';

const Home = () => {
  const [query, setQuery] = useState("")
  const [width, setWidth] = useState(window.innerWidth);
  const [singlePost, setSinglePost] = useState('');
  const [defaultPost, setDefaultPost] = useState(null);

  const { loading, data } = useQuery(GET_POSTS,{
    fetchPolicy: 'cache-and-network',
  });

  const  postData = data?.posts || [];
console.log("postData", postData)
  useEffect(() => {
    if (loading) {
      null
    } else {
      const  postData = data?.posts || []
        const defaultId= postData[0]._id
        setDefaultPost(defaultId)
        higlightPost(defaultPost)
    }
  },[data?.posts, loading, defaultPost]);

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
        <Skeleton style={{marginBottom:"20px"}} animation="wave" height={120} count={6} />
      </>
    )
  }
  
 if (width > breakpoint) {
    return (
      <div>
        <div className='searchBar-position'>
          <input className="searchBar-style" placeholder="Search for Blog Post" onChange={event => setQuery(event.target.value)} />
        </div>
        <div className="laptop-container">
          <div className="laptop-posts">
          <Scrollbars className="scrollbar" autoHeight autoHeightMin={100} autoHeightMax="calc(100vh - 36px - 35px - 75px)"style={{ width: "100%"}}>
            {postData.filter(post => {
              if (query === '') {
                return post;
              } else if (post.postTitle.toLowerCase().includes(query.toLowerCase())) {
                return post;
              }
            }).map((article, index) => (
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
      </div>
    );
  }
    
  return (
    <div className="main-content">
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
};

export default Home;