import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import {ADMIN_DELETE_USER} from '../../utils/mutations'
import {GET_ROLE_USER} from '../../utils/queries'

const AllUsers = ({ users }) => {
  const [adminDelete, { error }] = useMutation(ADMIN_DELETE_USER, {refetchQueries:[
    GET_ROLE_USER,
  ]});

  const deleteProfile = async(userId)=>{
   try { 
      await adminDelete({
        variables: { userId },
      });

      if (error) {
        throw new Error('unable to delete user');
      }

    } catch (err) {
    console.error(err);
    }

  }
    return (
      <div>
          {users &&
            users.map((user) => (
                <div key={user._id} className="card mb-3">
                  <h4 className="card-header bg-dark text-light p-2 mb-1">
                    {user.username} <br />
                    <Button className="mt-2" onClick={() => deleteProfile(user._id)} variant="danger">Delete User</Button>
                  </h4>
                 
                </div>
            ))}
      </div>
    );
  };
  
  export default AllUsers;
  