import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

// Mock data
const favoriteArticles = [
  { id: 1, title: 'Article One', summary: 'Summary of article one...' },
  { id: 2, title: 'Article Two', summary: 'Summary of article two...' },
  { id: 3, title: 'Article Three', summary: 'Summary of article three...' },
];

const Favorites = () => {
  const removeFromFavorites = (articleId) => {
    // requires logic to remove article from favorites
    console.log(`Remove article with id ${articleId} from favorites`);
  };

  return (
    <Container>
      <h1>Favorites</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {favoriteArticles.map((article) => (
          <Col key={article.id}>
            <Card>
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.summary}</Card.Text>
                <Button variant="danger" onClick={() => removeFromFavorites(article.id)}>
                  Remove from Favorites
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favorites;
