import {SINGLE_USER} from '../../utils/queries'
import { useQuery } from '@apollo/client';
import TopKeywords from './TopKeywords'
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
      <div className="card-3d my-5" style={{ padding: '20px' , background:"white"}}>
          <h1 className="text-center fw-bold fs-2 mb-4">{userData.username}&apos;s Profile</h1>
          <TopKeywords keywords={userData.likedKeywords}/>
          <h4 className='mt-5'>Update Profile Info</h4>
          <h7>To update your user information please edit the fields below and click submit</h7>
          <UpdateProfile username={userData.username} firstName={userData.firstName} lastName={userData.lastName}/> 
      </div>
  );
};

export default Profile;