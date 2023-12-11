import { useQuery } from '@apollo/client';
import {GET_USERS} from '../../utils/queries';
import { useMutation } from '@apollo/client';
import {ADD_FRIEND} from '../../utils/mutations';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
         <Link to="/friends"> 
            <Button style={{ maxWidth: '20vw',  padding: '5px', background: "#14e956" , border: "black", color:"black"}} variant="primary" type="submit" className="w-100 fw-bold mt-4">
                See friends
            </Button>
        </Link>
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