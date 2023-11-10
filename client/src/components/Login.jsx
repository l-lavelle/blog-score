import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import {LOGIN} from '../utils/mutations'

import  { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './Login.css';



const Login = () => {
  const [login, {error} ] = useMutation(LOGIN);
  
  const [userLoginData, setUserLoginData] = useState({ username: '', password: '' });

  const updateData= async (event)=>{
    const { name, value } = event.target;
    setUserLoginData({ ...userLoginData, [name]: value });
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const {data}  = await login({
        variables: { username: userLoginData.username,
        password: userLoginData.password},
      });

      Auth.login(data.login.token)

      if (error) {
        throw new Error('Unable login user');
      }

    } catch (error) {
      console.log(error);
    }
    
    setUserLoginData({
      username: '',
      password: '',
    })
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="card-3d my-5" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className="text-center">Login</Card.Title>
          
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='text-ad m-3'>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name='username'
                value={userLoginData.username}
                onChange={updateData}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className='text-ad m-3'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={userLoginData.password}
                onChange={updateData}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;


// import Auth from '../utils/auth';

// import { useMutation } from '@apollo/client';
// import {ADD_USER} from '../utils/mutations'

// const Login = () => {
  
//   const userinfo={username:"newUser2134",password:"12345",firstName:"tony", lastName:"denny" }

//   const [addUser, {error} ] = useMutation(ADD_USER);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const { data } = await addUser({
//         variables: { user:userinfo},
//       });
//       console.log(data)
//       Auth.login(data?.addUser?.token)

//       if (error) {
//         throw new Error('Unable create user');
//       }

//     } catch (error) {
//       console.log(error);
//     }

//   };

//     return (
//       <div>
//         <h1>Login Page- practicing signup</h1>
//         <button onClick={handleFormSubmit}>create trial user</button>
//       </div>
//     );
//   };
  
//   export default Login;



// when did the wrong page:
// import Auth from '../utils/auth';
// import { useMutation } from '@apollo/client';
// import {LOGIN} from '../utils/mutations'

// import  { useState } from 'react';
// import { Container, Form, Button, Card } from 'react-bootstrap';
// import './Login.css';



// const Login = () => {
//   const [login, {error} ] = useMutation(LOGIN);
//   const [userLoginData, setuserLoginData] = useState({ username: '', password: '' , firstName:'', lastName:''});

//   const updateData= async (event)=>{
//     const { name, value } = event.target;
//     setuserLoginData({ ...userLoginData, [name]: value });
//   }
//   const handleLogin = async (event) => {
//     event.preventDefault();
    
//     try {
//       const { data } = await addUser({
//         variables: { user: userinfo},
//       });
//       console.log(data)
//       Auth.login(data?.addUser?.token)

//       if (error) {
//         throw new Error('Unable create user');
//       }

//     } catch (error) {
//       console.log(error);
//     }
      
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//       <Card className="card-3d my-5" style={{ width: '18rem' }}>
//         <Card.Body>
//           <Card.Title className="text-center">Login</Card.Title>
          
//           <Form onSubmit={handleLogin}>
//             <Form.Group controlId="formBasicFirst">
//               <Form.Label className='text-ad m-3'>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter first name"
//                 name='firstName'
//                 value={userLoginData.firstName}
//                 onChange={updateData}
//               />
//             </Form.Group>
//             <Form.Group controlId="formBasicLast">
//               <Form.Label className='text-ad m-3'>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter last name"
//                 name='lastName'
//                 value={userLoginData.lastName}
//                 onChange={updateData}
//               />
//             </Form.Group>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label className='text-ad m-3'>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter username"
//                 name='username'
//                 value={userLoginData.username}
//                 onChange={updateData}
//               />
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//               <Form.Label className='text-ad m-3'>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 name='password'
//                 value={userLoginData.password}
//                 onChange={updateData}
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit" className="w-100 mt-4">
//               Submit
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default Login;