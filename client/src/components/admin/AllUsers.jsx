import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {ADMIN_DELETE_USER} from '../../utils/mutations';
import {GET_ROLE_USER} from '../../utils/queries';
import UsersModal from './UsersModal';

const AllUsers = ({ users }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({userId:'', username:'', comments:[]});
  const [adminDelete, { error }] = useMutation(ADMIN_DELETE_USER, {refetchQueries:[
    GET_ROLE_USER,
  ]});

  const openModal = async (_id, username, comments) =>{
    await setModalData({userId:_id, username: username, comments:comments})
    setModalShow(true)
  };

  // const deleteProfile = async(userId)=>{
  //  try { 
  //     await adminDelete({
  //       variables: { userId },
  //     });

  //     if (error) {
  //       throw new Error('unable to delete user');
  //     }

  //   } catch (err) {
  //   console.error(err);
  //   }
  // }

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
  