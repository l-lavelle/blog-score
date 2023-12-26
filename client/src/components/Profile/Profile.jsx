import {SINGLE_USER} from '../../utils/queries'
import { useQuery } from '@apollo/client';
import TopKeywords from './TopKeywords'
import UpdateProfile from './UpdateProfile';
import ProfilePic from './ProfilePic/ProfilePic';
import Skeleton from 'react-loading-skeleton';

const Profile = () => {
  const { loading, data } = useQuery(SINGLE_USER,{
    fetchPolicy: 'cache-and-network',
  });

  const userData = data?.singleUser
  
  if(loading){
    return (
      <Skeleton className="mt-3" style={{marginBottom:"20px"}} animation="wave" height={800} count={1} />
    )
  }

  return (
      <div className="card-3d my-5" style={{ padding: '20px' , background:"white", borderRadius:"25px"}}>
          <h1 className="text-center fw-bold fs-2 mb-4">{userData.displayName}&apos;s Profile</h1>
          <ProfilePic imgPic={userData.userPictureLink}/>
          <h4 className='mt-2 update-directions'>Update Profile Info</h4>
          <p className='update-directions'>To update your user information please edit the desired fields below and click submit</p>
          <UpdateProfile displayName={userData.displayName} firstName={userData.firstName} lastName={userData.lastName} title={userData.title} profileInfo={userData.profileInfo}/> 
          {userData.likedKeywords.length>0? 
            <TopKeywords className='mt-5' keywords={userData.likedKeywords}/>:
            <div>
            <h6 className='text-center'>No interests dectected yet. Go like some posts.</h6>
            </div>
          }
      </div>
  );
};

export default Profile;