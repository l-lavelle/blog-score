import AdminPreview from './AdminPreview';
import EditPostModal from './EditPostModal';
import { useState } from 'react';

// import { useMutation } from '@apollo/client';
// import { ADD_SKILL } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import {GET_POSTS} from '../../utils/queries'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

const AdminManageBlog = () => {
  const [modalShow, setModalShow] = useState(false);
  const { loading, data } = useQuery(GET_POSTS);
  const  postData = data?.posts || []

  const openModal = async (postId) =>{
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
          <div onClick={()=>openModal(article._id)} key={article._id}>
             <AdminPreview {...article} />
          </div>  
        ))}
      <EditPostModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        
      />
      </div>
     </>
    );
  };
  
export default AdminManageBlog;