import  { useState } from 'react';
import './ProfilePic.css';
import PictureModal from './PictureModal'


const ProfilePic = (props) => {
  console.log(props)
  const [modalShow, setModalShow] = useState(false);
 
   return (
    <>
    <div onClick={()=>setModalShow(true)}>
    <img className="profile-pic" onClick={() => setModalShow(true)}
      src={props.imgPic}
      alt="user pic"
    />
    </div>

    <PictureModal
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
    </>
  );
};

export default ProfilePic;