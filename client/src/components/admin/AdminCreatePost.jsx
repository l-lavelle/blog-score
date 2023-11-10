import Auth from '../../utils/auth';

const AdminCreatePost = () => {
  const trialAuth= ()=>{
    console.log(Auth.IsAdmin().data.role)
  }
  
  return (
    
    <button onClick={trialAuth}>sf</button>
  );
};

export default AdminCreatePost;