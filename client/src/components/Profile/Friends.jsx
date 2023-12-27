import { useQuery } from '@apollo/client';
import {SINGLE_USER} from '../../utils/queries';
import { useMutation } from '@apollo/client';
import {DELETE_FRIEND} from '../../utils/mutations';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import './FindUsers/FindUsers.css';

const Friends = () => {
  const [query, setQuery] = useState("");

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
        return (
          <>
        <div className="users-header-info">
          <h3 className='text-center pt-2'>Following</h3>
          <p className='text-center ms-3 me-3'>Click on a users profile to see all their posts. Want to follow more users?</p>
          <Link to="/users" className='link-users-center pb-3'> 
            <Button style={{ maxWidth: '50vw',  padding: '5px', background: "#14e956" , border: "black", color:"black"}} variant="primary" type="submit" className="w-100 fw-bold">
                Search for user
            </Button>
          </Link>
        </div>
          <Container className='mt-3'> 
          <div className='searchBar-position'>
             <input className="searchBar-style" placeholder="Search for User" onChange={event => setQuery(event.target.value)} />
           </div>
           <Row xs={6}>
           <Col xs={6} md={4} lg={3}>
           <Skeleton style={{marginBottom:"20px"}} animation="wave" height={180} count={4} />
           </Col>
           <Col xs={6} md={4} lg={3}>
           <Skeleton style={{marginBottom:"20px"}} animation="wave" height={180} count={4} />
           </Col>
           <Col xs={6} md={4} lg={3}>
           <Skeleton style={{marginBottom:"20px"}} animation="wave" height={180} count={4} />
           </Col>
           <Col xs={6} md={4} lg={3}>
           <Skeleton style={{marginBottom:"20px"}} animation="wave" height={180} count={4} />
           </Col>
           </Row>
           </Container>
           </>
        )
      }
      
      return (
        <>
      <div className="users-header-info">
       <h3 className='text-center pt-2'>Following</h3>
       <p className='text-center ms-3 me-3'>Click on a users profile to see all their posts. Want to follow more users?</p>
       <Link to="/users" className='link-users-center pb-3'> 
            <Button style={{ maxWidth: '50vw',  padding: '5px', background: "#14e956" , border: "black", color:"black"}} variant="primary" type="submit" className="w-100 fw-bold">
                Search for user
            </Button>
        </Link>
      </div>
        {users.length>0? 
        <Container className='mt-3'> 
        <div className='searchBar-position'>
          <input className="searchBar-style" placeholder="Search for User" onChange={event => setQuery(event.target.value)} />
        </div>
          <Row xs={6} >
            {users.filter(user => {
          if (query === '') {
            return user;
          } else if (user.displayName.toLowerCase().includes(query.toLowerCase())) {
            return user;
          }
        }).map((user) => (
           <Col xs={6} md={4} lg={3} key={user._id}>
            <div className="card d-flex align-items-center mb-3 user-card"> 
            <Link className='link-profile-center mt-2' to={"/friends/"+user._id}> 
            <img className="thumbnail-image img-card-user" 
                    src={user.userPictureLink}
                    alt="user pic"
            />
            </Link>
            <div className='user-name'>{user.displayName}</div> 
            <Button className="mb-2 mt-2" style={{ maxWidth: '20vw',  padding: '5px', background: "#FF7F7F" , border: "black", color:"black"}}  onClick={()=>removeFriend(user._id)}>Unfollow</Button>
            </div>
          </Col>))}
         </Row>
         </Container> 
        :
        <h5 className="text-center mt-3" style={{ background: "white" , border: "black", padding:"20px", borderRadius:"25px"}}>Not following anyone yet. Search for users add!</h5>}
        </>
      );
    };
    
export default Friends;