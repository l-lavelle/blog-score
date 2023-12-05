import { useState } from 'react';
import UsersModal from './UsersModal';

const AllUsers = ({ users }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({userId:'', username:'', comments:[]});

  const openModal = async (_id, username, comments) =>{
    await setModalData({userId:_id, username: username, comments:comments})
    setModalShow(true)
  };

  return (
    <div>
      {users &&
        users.map((user) => (
          <div key={user._id} className="card mb-3">
            <h4 onClick={() => openModal(user._id, user.username, user.comments)} className="card-header bg-dark text-light p-2 mb-1">
              {user.username} <br />
            </h4>
            <UsersModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              userId={modalData.userId}
              username={modalData.username}
              comments={modalData.comments}
            />
          </div>
        ))}
    </div>
  );
};
  
export default AllUsers;
  