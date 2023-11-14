import { Container, Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import {USER_LIKED_POSTS} from '../utils/queries'
import './Favorites.css'

const Favorites = () => {
  
  const {  data } = useQuery(USER_LIKED_POSTS);
  const  likedPostData = data?.userLikedPost?.likedPost || []

  return (
    <Container>
    <h1 id="favorite-title">Favorites</h1>
    {likedPostData.length  ?  
    <>
        {likedPostData.map((article) => (
            <Card key={article._id}  className="mb-4">
              <Card.Body>
                <Card.Title>{article.postTitle}</Card.Title>
                <Card.Text>{article.postText}</Card.Text>
              </Card.Body>
            </Card>
        ))}
      </>:<h4 id="favorite-error">No Favorited Posts</h4>}
    </Container>
  );
};

export default Favorites;
