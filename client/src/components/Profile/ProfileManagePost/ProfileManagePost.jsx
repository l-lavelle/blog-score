import AdminPreview from '../../admin/AdminPreview';
import EditPostModal from '../../admin/EditPostModal';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {SINGLE_USER_POSTS} from '../../../utils/queries';
import Skeleton from 'react-loading-skeleton';
import './ProfileManagePost.css';

const ProfileManagePost = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({postId: "", blogTitle:"" , blogText: "", tags:[]});
  const { loading, data } = useQuery(SINGLE_USER_POSTS,  {
    fetchPolicy: 'cache-and-network',
  });
  
  const  postData = data?.singleUserBlogs?.posts || [];

  const openModal = async (_id, blogTitle, blogText) =>{
    await setModalData({postId:_id, blogTitle:blogTitle, blogText: blogText})
    setModalShow(true)
  };

  if (loading) {
    return (
      <>
      <div className="p-3" style={{background:"white", borderRadius:"25px"}}>
      <div className="p-1 mb-3" style={{background:"white"}}>
      <h3 className='text-center fw-bold fs-2 p-3'>Manage Blog Posts</h3>
      <p className="ps-5 pe-5">Welcome to your posts dashboard! Here you can see all of the posts that you have created. Click on one of the posts to see the entire post and edit or delete.</p>
      </div>
      <Skeleton style={{marginBottom:"20px"}} animation="wave" height={120} count={6} />
      </div>
      </>
    )
  }

  return (
    <div className='ProfileMangePosts-container'>
      <h1 className="text-center fw-bold fs-2 p-3">Manage Blog Posts </h1>
      <p className="ps-5 pe-5" style={{fontSize:"1.1rem"}}>Welcome to your posts dashboard! Here you can see all of the posts that you have created. Click on one of the posts to see the entire post and edit or delete.</p>
      <div className="main-content p-3">
      {postData.length>0?
        <>
        {postData.map((article) => (
          <div onClick={()=>openModal(article._id, article.postTitle, article.postText)} key={article._id}>
              <AdminPreview {...article} />
          </div>  
        ))}
        </>
        :
        <h5 className="text-center mt-3" style={{ background: "white" , border: "black", padding:"20px", borderRadius:"25px"}}>
        You have not created any blog posts yet</h5>}

        <EditPostModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          postId={modalData.postId}
          text={modalData.blogText}
          title={modalData.blogTitle}
        />
      </div>
    </div>
  );
};
  
export default ProfileManagePost;