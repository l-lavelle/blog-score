import AdminPreview from './AdminPreview';
// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_SKILL } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../../utils/queries'

const AdminManageBlog = () => {
  const { loading, data } = useQuery(GET_POSTS);
  const  postData = data?.posts || []

  const openModal = async (event) =>{
    // event.preventDefault();
    console.log(event.value)
  }
  // console.log("post data", postData)
  if (loading) {
    return <div>Loading...</div>;
  }
    return (
      <>
      <h1>Manage Blog Posts </h1>
      <div className="main-content">
        {postData.map((article, index) => (
          <div onClick={openModal} key={index}>
             <AdminPreview {...article} />
          </div>
           
        ))}
      </div>
     </>
    );
  };
  
export default AdminManageBlog;