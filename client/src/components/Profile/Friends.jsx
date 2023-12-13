import { useQuery } from '@apollo/client';
import {SINGLE_USER} from '../../utils/queries';
import { useMutation } from '@apollo/client';
import {DELETE_FRIEND} from '../../utils/mutations';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Friends = () => {
    const { loading, data } = useQuery(SINGLE_USER, {
        fetchPolicy: 'cache-and-network',
      });
      const  users = data?.singleUser?.friends || [];

      const [deleteFriend] = useMutation(DELETE_FRIEND, {refetchQueries:[
        SINGLE_USER
      ]});

      const removeFriend= async (userId)=>{
        try{
          await deleteFriend({
            variables: { 
                userId: userId, 
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
        <Link to="/users"> 
            <Button style={{ maxWidth: '20vw',  padding: '5px', background: "#14e956" , border: "black", color:"black"}} variant="primary" type="submit" className="w-100 fw-bold mt-4">
                Search for user
            </Button>
        </Link>
       <h3 className='text-center mb-3'style={{color:"white"}}>Friends</h3>
       
        {users.length>0? 
            users.map((user) => (
          <div  key={user._id} className="card mb-3">
          <Link to={"/friends/"+user._id}> 
            <h4 className="card-header p-2 ">
              {user.username} <br />
            </h4>
          </Link>
            <p onClick={()=>removeFriend(user._id)}>-</p>
          </div>
        )) 
        :
        <h3 className="text-center" style={{ background: "white" , border: "black", padding:"20px"}}>No friends yet. Search for users to add friends!</h3>}
        </>
      );
    };
    
export default Friends;