import Auth from '../../utils/auth'
const AdminProfile = () => {
    const trialAuth= ()=>{
    console.log(Auth.IsAdmin())
  }
    return (
       <button onClick={trialAuth}>Auth trial</button>
    );
  };
  
  export default AdminProfile;


