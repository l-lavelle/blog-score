import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { RECENT_POSTS_QUERY } from '../utils/queries';
import Card from 'react-bootstrap/Card';

function RecentlyViewedPosts() {
  const { loading, error, data } = useQuery(RECENT_POSTS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  console.log(data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

  return (
    <div className="container">
      <Card>
        <Card.Header>Recently Viewed Posts</Card.Header>
        <Card.Body>
          {data.recentPosts.map((post, index) => (
            <Card key={post._id} className="mb-3">
              <Card.Header>Your recently viewed {index + 1}</Card.Header>
              <Card.Body>
                <h5>{post.postTitle}</h5>
                <p>{post.postText}</p>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecentlyViewedPosts;
