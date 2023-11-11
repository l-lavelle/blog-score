import ArticlePreview from '../ArticlePreview';
// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_SKILL } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../../utils/queries'

const AdminManageBlog = () => {
  const { loading, data } = useQuery(GET_POSTS);
  const  postData = data?.posts || []

  console.log("post data", postData)
  if (loading) {
    return <div>Loading...</div>;
  }
    return (
      <>
      <h1>Manage Blog Posts </h1>
      <div className="main-content">
        {postData.map((article, index) => (
          <ArticlePreview key={index} {...article} />
        ))}
      </div>
     </>
    );
  };
  
export default AdminManageBlog;