import  { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import {SINGLE_USER} from '../../utils/queries'
import { useQuery } from '@apollo/client';
import TopKeywords from './TopKeywords'
import {UPDATE_USER} from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import UpdateProfile from './UpdateProfile';

const Profile = () => {
  const { loading, data } = useQuery(SINGLE_USER,{
    fetchPolicy: 'cache-and-network',
  });

  const userData = data?.singleUser

if(loading){
  return <h1>loading...</h1>
}

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="card-3d my-5" style={{ width: '40rem', padding: '20px' }}>
        <Card.Body>
          <Card.Title className="text-center fw-bold fs-2">{userData.username}&apos;s Profile</Card.Title>
          <UpdateProfile username={userData.username} firstName={userData.firstName} lastName={userData.lastName}/>
          <TopKeywords keywords={userData.likedKeywords}/>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;