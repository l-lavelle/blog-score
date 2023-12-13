import { useQuery } from '@apollo/client';
import {GET_USERS} from '../../utils/queries';
import { useMutation } from '@apollo/client';
import {ADD_FRIEND} from '../../utils/mutations';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {SINGLE_USER} from '../../utils/queries';
import Auth from '../../utils/auth'

const FindUsers = () => {
    const { loading, data:allUsers } = useQuery(GET_USERS, {
        fetchPolicy: 'cache-and-network',
      });
      const  users = allUsers?.users || [];
      console.log(" all users", users)

      const { data:user } = useQuery(SINGLE_USER, {
        fetchPolicy: 'cache-and-network',
      });
      const  currentFriends = user?.singleUser?.friends || [];
      console.log("current friends", currentFriends)
    
      const [addFriend] = useMutation(ADD_FRIEND, {refetchQueries:[
        GET_USERS, SINGLE_USER
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
  
      const results = users.filter(({ _id: id1 }) => !currentFriends.some(({ _id: id2 }) => id2 === id1));
      const withoutSelf = results.filter(users=> users._id !== Auth.getProfile().data._id)
      console.log("me",withoutSelf)
      return (
        <>
         
       <h3 className='text-center mb-3'style={{color:"white"}}>Find Users</h3>
       <p>To follow a user click on there profile and they will be added to your following list. All done looking for users?</p>
       <Link to="/friends"> 
            <Button style={{ maxWidth: '20vw',  padding: '5px', background: "#14e956" , border: "black", color:"black"}} variant="primary" type="submit" className="w-100 fw-bold mt-4">
                See Following
            </Button>
        </Link>
        {users &&
            withoutSelf.map((user) => (
          <div key={user._id} className="card mb-3">
            <h4 className="card-header p-2 ">
            <img className="thumbnail-image img-size" 
                    src={"https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} 
                    alt="user pic"
            />
            <Link to={"/user/"+user._id}> 
              {user.username} <br />
            </Link>
            </h4>
            <p onClick={()=>newFriend(user._id)}>+</p>
          </div>
        ))}
        </>
      );
    };
    
export default FindUsers;