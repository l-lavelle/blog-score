import { useQuery } from '@apollo/client';
import {GET_USERS} from '../../utils/queries';
import { useMutation } from '@apollo/client';
import {ADD_FRIEND} from '../../utils/mutations';

const FindUsers = () => {
    const { loading, data } = useQuery(GET_USERS, {
        fetchPolicy: 'cache-and-network',
      });
      const  users = data?.users || [];
    
      const [addFriend] = useMutation(ADD_FRIEND, {refetchQueries:[
        GET_USERS
      ]});

      const newFriend= async (userId)=>{
        try{
          await addFriend({
            variables: { 
                userId: userId
            }
          })
        }catch (err){
          console.error(err)
        }
      };

      if (loading) {
        return <div>Loading...</div>;
      }
      
      return (
        <>
       <h3 className='text-center mb-3'style={{color:"white"}}>Find Users</h3>
        {users &&
            users.map((user) => (
          <div  key={user._id} className="card mb-3">
            <h4 className="card-header p-2 ">
              {user.username} <br />
            </h4>
            <p className="" onClick={()=>newFriend(user._id)}  >+</p>
          </div>
        ))}
        </>
      );
    };
    
export default FindUsers;