import AdminPreview from './AdminPreview';
import EditPostModal from './EditPostModal';
import { useState } from 'react';

import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../../utils/queries'


const AdminManageBlog = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({blogTitle:"hi" , blogText: "bye", tags:[]})
  const { loading, data } = useQuery(GET_POSTS);
  const  postData = data?.posts || []

  const openModal = async (postId, blogTitle, blogText) =>{
    await setModalData({blogTitle:blogTitle, blogText: blogText})
    setModalShow(true)
  }

  if (loading) {
    return <div>Loading...</div>;
  }
    return (
      <>
      <h1>Manage Blog Posts </h1>
      <div className="main-content">
        {postData.map((article) => (
          <div onClick={()=>openModal(article._id, article.postTitle, article.postText)} key={article._id}>
             <AdminPreview {...article} />
          </div>  
        ))}
      <EditPostModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        text={modalData.blogText}
        title={modalData.blogTitle}
      />
      </div>
     </>
    );
  };
  
export default AdminManageBlog;