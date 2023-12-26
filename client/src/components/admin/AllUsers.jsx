import { useState } from 'react';
import UsersModal from './UsersModal';

const AllUsers = ({ users }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({userId:'', displayName:'', comments:[]});

  const openModal = async (_id, displayName, comments) =>{
    await setModalData({userId:_id, displayName: displayName, comments:comments})
    setModalShow(true)
  };

  return (
    <div>
      {users &&
        users.map((user) => (
          <div key={user._id} className="card mb-3">
            <h4 onClick={() => openModal(user._id, user.displayName, user.comments)} className="card-header bg-dark text-light p-2 mb-1">
              {user.displayName} <br />
            </h4>
            <UsersModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              userId={modalData.userId}
              displayName={modalData.displayName}
              comments={modalData.comments}
            />
          </div>
        ))}
    </div>
  );
};
  
export default AllUsers;
  