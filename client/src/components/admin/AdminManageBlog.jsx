import AdminPreview from './AdminPreview';
import EditPostModal from './EditPostModal';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../../utils/queries';
import Skeleton from 'react-loading-skeleton';

const AdminManageBlog = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({postId: "", blogTitle:"" , blogText: "", tags:[]});
  const { loading, data } = useQuery(GET_POSTS,  {
    fetchPolicy: 'cache-and-network',
  });
  const  postData = data?.posts || [];

  const openModal = async (_id, blogTitle, blogText) =>{
    await setModalData({postId:_id, blogTitle:blogTitle, blogText: blogText})
    setModalShow(true)
  };

  if (loading) {
    return (
      <>
      <h3 className='text-center fw-bold fs-2'style={{color:"white"}}>Manage Blog Posts</h3>
      <Skeleton style={{marginBottom:"20px"}} animation="wave" height={120} count={6} />
      </>
    )
  }

  return (
    <>
      <h1 className="text-center fw-bold fs-2" style={{ color:"white"}}>Manage Blog Posts </h1>
      <div className="main-content">
        {postData.map((article) => (
          <div onClick={()=>openModal(article._id, article.postTitle, article.postText)} key={article._id}>
              <AdminPreview {...article} />
          </div>  
        ))}
        <EditPostModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          postId={modalData.postId}
          text={modalData.blogText}
          title={modalData.blogTitle}
        />
      </div>
    </>
  );
};
  
export default AdminManageBlog;