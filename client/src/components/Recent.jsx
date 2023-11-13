/*import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { RECENT_POSTS_QUERY } from '../utils/queries';

const Recent = () => {
  const { loading, error, data } = useQuery(RECENT_POSTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Recent Posts</h1>
      {data.recentPosts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Recent;
*/
import React from 'react';
import Card from 'react-bootstrap/Card';

function RecentlyViewedPosts() {
  // Define your list of recently viewed articles
  const recentlyViewedArticles = [
    {
      title: 'Article 1',
      content: 'This is the content of Article 1.',
    },
    {
      title: 'Article 2',
      content: 'This is the content of Article 2.',
    },
    {
      title: 'Article 2',
      content: 'This is the content of Article 2.',
    },
    {
      title: 'Article 2',
      content: 'This is the content of Article 2.',
    },
    {
      title: 'Article 2',
      content: 'This is the content of Article 2.',
    },
    {
      title: 'Article 2',
      content: 'This is the content of Article 2.',
    },
    {
      title: 'Article 2',
      content: 'This is the content of Article 2.',
    },
    
    // Add more articles as needed
  ];

  return (
    <div className="container">
      <Card>
        <Card.Header>Recently Viewed Posts</Card.Header>
        <Card.Body>
          {recentlyViewedArticles.map((article, index) => (
            <Card key={index} className="mb-3">
              <Card.Header>Your recently viewed {index + 1}</Card.Header>
              <Card.Body>
                <h5>{article.title}</h5>
                <p>{article.content}</p>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecentlyViewedPosts;
