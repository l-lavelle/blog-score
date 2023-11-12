// import React from 'react';
import ArticlePreview from './ArticlePreview';
import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../utils/queries'


const MainContent = () => {
  // Simulate loading state
  // const loading = true;

  const { loading, data } = useQuery(GET_POSTS);
  const  postData = data?.posts || []
  console.log(postData)
  // Create mock articles or an empty array if loading need to test
  if (loading) {
    Array.from({ length: 5 }, (_, index) => ({
      title: 'Loading Article ' + (index + 1),
      content: 'Loading content...',
    }))
  }


  return (
    <div className="main-content">
      {postData.map((article, index) => (
        <ArticlePreview key={index} {...article} />
       
      ))}
    </div>
  );
};

export default MainContent;
