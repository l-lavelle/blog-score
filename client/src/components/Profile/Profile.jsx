import {SINGLE_USER} from '../../utils/queries'
import { useQuery } from '@apollo/client';
import TopKeywords from './TopKeywords'
import UpdateProfile from './UpdateProfile';

const Profile = () => {
  const { loading, data } = useQuery(SINGLE_USER,{
    fetchPolicy: 'cache-and-network',
  });

  const userData = data?.singleUser
  console.log(userData)
if(loading){
  return <h1>loading...</h1>
}

  return (
      <div className="card-3d my-5" style={{ padding: '20px' , background:"white", borderRadius:"25px"}}>
          <h1 className="text-center fw-bold fs-2 mb-4">{userData.username}&apos;s Profile</h1>
          {/* {userData.likedKeywords.length>0? 
          <TopKeywords keywords={userData.likedKeywords}/>:<div>
          <h6>No interests dectected yet. Go like some posts</h6>
        </div>} */}
          <h4 className='mt-5'>Update Profile Info</h4>
          <p>To update your user information please edit the fields below and click submit</p>
          <UpdateProfile username={userData.username} firstName={userData.firstName} lastName={userData.lastName}/> 
      </div>
  );
};

export default Profile;