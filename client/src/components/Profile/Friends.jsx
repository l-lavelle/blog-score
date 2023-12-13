import { useQuery } from '@apollo/client';
import {SINGLE_USER} from '../../utils/queries';
import { useMutation } from '@apollo/client';
import {DELETE_FRIEND} from '../../utils/mutations';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

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
       <h3 className='text-center mb-3'style={{color:"white"}}>Following</h3>
    
        {users.length>0? 
        <Container> 
        <Row xs={6}>
            {users.map((user) => (
           <Col xs={6} md={4} key={user._id}>
            <div className="card" style={{ height: "12rem" }}> 
            <h4 className="p-2 ">
            <Link to={"/friends/"+user._id}> 
              {user.username} <br />
            </Link>
              <img className="thumbnail-image img-size" 
                    src={"https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} 
                    alt="user pic"
              />
              <p onClick={()=>removeFriend(user._id)}>-</p>
            </h4>
            </div>
          </Col>))}
         </Row>
         </Container> 
        :
        <h3 className="text-center" style={{ background: "white" , border: "black", padding:"20px"}}>No friends yet. Search for users to add friends!</h3>}
        
        </>
      );
    };
    
export default Friends;