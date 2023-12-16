import { useState } from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import AdminManageBlog from '../AdminManageBlog'
import AdminManageUsers from '../AdminManageUsers';

const AdminDash=()=>{
  const [show, setShow] = useState({component:'managePosts'});

    const changePage = (e)=>{
        const currentCompoent= e.target.name
        setShow({component: currentCompoent})
    }

    return(
    <>
    <ButtonGroup className="mb-3" aria-label="Basic example">
      <Button name="manageBlogs" onClick={changePage} className={show.component==="manageBlogs"?"dash-btn-hightlight":""} variant="secondary">Manage All Posts</Button>
      <Button name="manageUsers" onClick={changePage} className={show.component==="manageUsers"?"dash-btn-hightlight":""}variant="secondary">Manage Users</Button>
    </ButtonGroup>
    {show.component==="manageBlogs"? <AdminManageBlog/> :[]}
    {show.component==="manageUsers"? <AdminManageUsers/>:[]}
    </>
  )
}
export default AdminDash