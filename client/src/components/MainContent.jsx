// import React from 'react';
import ArticlePreview from './ArticlePreview';
import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../utils/queries'
import {GET_RECOMMENDED_POSTS} from '../utils/queries'
const MainContent = () => {
  // Simulate loading state
  // const loading = true;

  const { loading, data } = useQuery(GET_RECOMMENDED_POSTS,{
    fetchPolicy: 'cache-and-network',
  });
console.log(GET_POSTS)
console.log(GET_RECOMMENDED_POSTS)
  const  postData = data?.getRecommendedPosts || []
  // Create mock articles or an empty array if loading need to test
  if (loading) {
    return (
    <>
      <h1>hi</h1>
      {/* {Array.from({ length: 5 }, (_, index) => ({
        title: 'Loading Article ' + (index + 1),
        content: 'Loading content...',
      }))} */}
    </>
    )
    
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
