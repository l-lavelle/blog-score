import { useState } from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import UserComments from '../UserComments';
import AdminCreatePost from '../../admin/AdminCreatePost';
import ProfileManagePost from '../ProfileManagePost/ProfileManagePost';

const ProfileDashboard=()=>{
  const [show, setShow] = useState({component:'createPosts'});

    const changePage = (e)=>{
        const currentCompoent= e.target.name
        setShow({component: currentCompoent})
    }

    return(
    <>
    <ButtonGroup aria-label="Basic example">
      <Button name="createPosts" onClick={changePage} className={show.component==="createPosts"?"mt-5":""} variant="secondary">Left</Button>
      <Button name="managePosts" onClick={changePage} className={show.component==="managePosts"?"mt-5":""}variant="secondary">Middle</Button>
      <Button name="comments" onClick={changePage} className={show.component==="comments"?"mt-5":""} variant="secondary">Comments</Button>
    </ButtonGroup>
    {/* {!show.component? <AdminCreatePost/>:[]} */}
    {show.component==="createPosts"? <AdminCreatePost/> :[]}
    {show.component==="managePosts"? <ProfileManagePost/>:[]}
    {show.component==="comments"? <UserComments/>:[]}
   
    </>
  )
}
export default ProfileDashboard