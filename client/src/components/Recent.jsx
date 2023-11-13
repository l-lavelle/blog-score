import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { RECENT_POSTS_QUERY } from '../utils/queries';

const Recent = () => {
  const { loading, error, data } = useQuery(RECENT_POSTS_QUERY);
console.log(data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h1>Recent Posts</h1>
      {data.recentPosts.map((post) => (
        <div key={post._id}>
          <h3>{post.postTitle}</h3>
        </div>
      ))}
    </div>
  );
};

export default Recent;
