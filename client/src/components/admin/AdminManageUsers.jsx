import { useQuery } from '@apollo/client';
import {GET_ROLE_USER} from '../../utils/queries';
import AllUsers from './AllUsers';

const AdminManageUsers = () => {

const { loading, data } = useQuery(GET_ROLE_USER, {
  fetchPolicy: 'cache-and-network',
});
const  users = data?.basicUser || [];

if (loading) {
  return <div>Loading...</div>;
}

return (
      <>
        <h1 className="text-center fw-bold fs-2" style={{ color:"white"}}>Manage Users</h1>
        <AllUsers users={users}/>
      </>
    );
  };
  
  export default AdminManageUsers;