import { useQuery } from '@apollo/client';
import {GET_USERS} from '../../../utils/queries';
import { useMutation } from '@apollo/client';
import {ADD_FRIEND} from '../../../utils/mutations';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import {SINGLE_USER} from '../../../utils/queries';
import Auth from '../../../utils/auth';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import './FindUsers.css';

const FindUsers = () => {
  const [query, setQuery] = useState("");
    const { loading, data:allUsers } = useQuery(GET_USERS, {
        fetchPolicy: 'cache-and-network',
      });
      const  users = allUsers?.users || [];

      const { data:user } = useQuery(SINGLE_USER, {
        fetchPolicy: 'cache-and-network',
      });
      const  currentFriends = user?.singleUser?.friends || []
    
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
        return (
        <>
       <div className="users-header-info">
        <h3 className='text-center pt-2'>Find Users</h3>
        <p className='text-center'>To follow a user click on there profile and they will be added to your following list. All done looking for users?</p>
        <Link to="/friends" className='link-users-center pb-3'> 
            <Button style={{ maxWidth: '20vw',  padding: '5px', background: "#14e956" , border: "black", color:"black"}} variant="primary" type="submit" className="w-100 fw-bold">
                See Following
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
  
      const results = users.filter(({ _id: id1 }) => !currentFriends.some(({ _id: id2 }) => id2 === id1));
      const withoutSelf = results.filter(users=> users._id !== Auth.getProfile().data._id)
      
      return (
      <>
      <div className="users-header-info">
       <h3 className='text-center pt-2'>Find Users</h3>
       <p className='text-center'>To follow a user click on there profile and they will be added to your following list. All done looking for users?</p>
       <Link to="/friends" className='link-users-center pb-3'> 
            <Button style={{ maxWidth: '20vw',  padding: '5px', background: "#14e956" , border: "black", color:"black"}} variant="primary" type="submit" className="w-100 fw-bold">
                See Following
            </Button>
        </Link>
        </div>
        {users &&
        <Container className='mt-3'> 
        <div className='searchBar-position'>
          <input className="searchBar-style" placeholder="Search for User" onChange={event => setQuery(event.target.value)} />
        </div>
        <Row xs={6}>
        {withoutSelf.filter(user => {
          if (query === '') {
            return user;
          } else if (user.username.toLowerCase().includes(query.toLowerCase())) {
            return user;
          }
        }).map((user) => (
          <Col xs={6} md={4} lg={3} key={user._id}>
          <div className="card d-flex align-items-center mb-3 user-card" > 
            <Link className='link-profile-center mt-2' to={"/user/"+user._id}>
            <img className="thumbnail-image img-card-user" 
                    src={user.userPictureLink}
                    alt="user pic"
            />
            </Link>
            <div className='user-name'>{user.username} </div>
            <Button style={{ maxWidth: '20vw',  padding: '5px', background: "#14e956" , border: "black", color:"black"}} className="mb-2 mt-2" onClick={()=>newFriend(user._id)}>Follow</Button>
          </div>
          </Col>
        ))}
        </Row>
        </Container>
        }
        </>
      );
    };
    
export default FindUsers;