import { useQuery } from '@apollo/client';
import {GET_ROLE_USER} from '../../utils/queries';
import AllUsers from './AllUsers';
import Skeleton from 'react-loading-skeleton';

const AdminManageUsers = () => {

const { loading, data } = useQuery(GET_ROLE_USER, {
  fetchPolicy: 'cache-and-network',
});
const  users = data?.basicUser || [];

if (loading) {
  return (
    <>
    <h3 className='text-center fw-bold fs-2'style={{color:"white"}}>Manage Users</h3>
    <Skeleton style={{marginBottom:"20px"}} animation="wave" height={60} count={6} />
    </>
  )
}

return (
    <>
      <h1 className="text-center fw-bold fs-2" style={{ color:"white"}}>Manage Users</h1>
      <AllUsers users={users}/>
    </>
  );
};
  
export default AdminManageUsers;