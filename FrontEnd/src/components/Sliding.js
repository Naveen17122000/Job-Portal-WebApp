import React, { useState ,useEffect } from 'react';
import "./Sliding.css";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const baseURL = 'http://127.0.0.1:8000/api/';

axios.defaults.withCredentials = true;

function LoginPage() {
  const navigate = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };
  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };
  const [currentUser, setCurrentUser] = useState();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {

  //   // axios.post(baseURL+'usersignin/', { withCredentials: true })
  //   //   .then((res) =>{
  //   //     console.log(res.data)
  //   //     setCurrentUser(true);
  //   //   })
  //   //   .catch((error) =>{
  //   //     setCurrentUser(false);
  //   //     console.error("Error fetching user data:", error);
  //   //   });
  //   submitLogin();
  //   submitRegistration();

  // }, []);

  
  function submitRegistration(e) {
    e.preventDefault();
    axios.post(
      `${baseURL}usersignup/`,
      {
        username: username,
        email: email,
        password: password
      },
      {withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
       }
    )  
    .then((res) => {
      console.log("User registered successfully:",res.data);
    }).catch((error) => {
      console.error("Error registering user:", error);
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    axios.post(
      `${baseURL}usersignin/`,
      {
        email: email,
        password: password
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type':'application/json',
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      setCurrentUser(true);
      navigate("/UserDashboard"); 
      
    }).catch((error) => {
      console.error("Error logging in:", error);
    });
  }

  return (
    <div className={`loginContainer ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
        <form onSubmit={submitLogin} action="#" className="sign-in-form loginForm">

            <h2 className="title">Sign in</h2>
            <div className="input-field1">
              <input className='LoginInput' placeholder=" " type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <label className="labelline" >Email</label>
              <box-icon name='envelope' color='white' ></box-icon>
            </div>
            <div className="input-field1">
              <input className='LoginInput' placeholder=" " type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <label className="labelline" >Password</label>
              <box-icon name='lock-alt' color='white' ></box-icon>
            </div><br />
            <div className="l3">
              <label>&emsp;<input type="checkbox" />Remember Me</label>&emsp;&emsp;
              <a href="#">Forgot Password?</a><br />
            </div>
            <button type='submit' className='btn'>Signin</button><div><hr style={{ background: 'white', color: 'white', borderColor: 'white', height: '3px', width: '200px' }} /></div><br />
            <div className='Admin-Link'>
              <Link to="/admin">Admin Login</Link>
            </div>
          </form>
          <form action="#" onSubmit={e => submitRegistration(e)} className="sign-up-form loginForm"> 
   
            <h2 className="title">Sign up</h2>
            <div className="input-field1">
              <input className='LoginInput' placeholder=" " type="text" id="lastname"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
              <label className="labelline" >Full Name</label>
            </div>
            <div className="input-field1">
              <input className='LoginInput' placeholder="" type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <label className="labelline" >Email</label>
              <box-icon name='envelope' color='white' ></box-icon>
            </div>
            <div className="input-field1">
              <input className='LoginInput' placeholder=" " type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <label className="labelline" >Password</label>
              <box-icon name='lock-alt' color='white' ></box-icon>
            </div>
            <button type='submit' className='btn'>Singup</button><div><hr style={{ background: 'white', color: 'white', borderColor: 'white', height: '3px', width: '200px' }} /></div><br />
            <div className='Admin-Link'>
              <Link to="/admin">Admin Login</Link>
            </div>
          </form>
       
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3 className='loginh3'>Don't have an account?</h3>
            <button className="btntransparent" onClick={handleSignUpClick}>
              Register
            </button>
          </div>
          <img src="./images/logo.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3 className='loginh3'>Already Registerd ?</h3>
            <button onClick={handleSignInClick} className="btntransparent" id="sign-in-btn">
              Login
            </button>
          </div>
          <img src="./images/logo1.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  )
}

export default LoginPage;