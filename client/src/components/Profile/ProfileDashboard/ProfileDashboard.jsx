import { useState } from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import UserComments from '../UserComments';
import AdminCreatePost from '../../admin/AdminCreatePost';
import ProfileManagePost from '../ProfileManagePost/ProfileManagePost';
import './ProfileDashboard.css';

const ProfileDashboard=()=>{
  const [show, setShow] = useState({component:'createPosts'});

    const changePage = (e)=>{
        const currentCompoent= e.target.name
        setShow({component: currentCompoent})
    }

    return(
    <>
    <ButtonGroup className="mb-3" aria-label="Basic example">
      <Button name="createPosts" onClick={changePage} className={show.component==="createPosts"?"dash-btn-hightlight":""} variant="secondary">Create Posts</Button>
      <Button name="managePosts" onClick={changePage} className={show.component==="managePosts"?"dash-btn-hightlight":""}variant="secondary">Manage Posts</Button>
      <Button name="comments" onClick={changePage} className={show.component==="comments"?"dash-btn-hightlight":""} variant="secondary">Manage Comments</Button>
    </ButtonGroup>
    {/* {!show.component? <AdminCreatePost/>:[]} */}
    {show.component==="createPosts"? <AdminCreatePost/> :[]}
    {show.component==="managePosts"? <ProfileManagePost/>:[]}
    {show.component==="comments"? <UserComments/>:[]}
   
    </>
  )
}
export default ProfileDashboard