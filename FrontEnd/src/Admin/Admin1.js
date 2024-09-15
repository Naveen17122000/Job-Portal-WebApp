import React from "react";
import "./Admin1.css";
import axios from "axios";
import { useState,useEffect } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const baseURL = 'http://127.0.0.1:8000/api/';

axios.defaults.withCredentials = true;

const Admin1 = () => { 
  const navigate = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const itemList = ["Admin", "SuperUser"];
  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };
  const [currentUser, setCurrentUser] = useState();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Admusername, setAdmUsername] = useState('');
  const [Admpassword, setAdmPassword] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const handleDropdownChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedItem) {
      console.error("Please select a user type (Admin or Superuser)");
      return;
    }
    const userData = {
      firstname,
      lastname,
      username,
      email,
      password,
      Admusername,
      Admpassword,
      userType: selectedItem,
    };

    console.log('Submitted Data:', userData);
  };

  const [swapPanel, setSwapPanel] = useState(false);
  const signUpButton = () => {
    setSwapPanel(true);
  };
  const signInButton = () => {
    setSwapPanel(false);
  };

  useEffect(() => {

    axios.post(baseURL+'usersignin/', { withCredentials: true })
      .then((res) =>{
        console.log(res.data)
        setCurrentUser(true);
      })
      .catch((error) =>{
        setCurrentUser(false);
        console.error("Error fetching user data:", error);
      });
  }, []);
  function submitRegistration(e) {
    e.preventDefault();
    axios.post(
      `${baseURL}usersignup/`,
      {
        email: email,
        username : username,
        password: password,
        is_staff: selectedItem === 'Admin', // Set is_staff based on selection
        is_superuser: selectedItem === 'SuperUser', // Set is_superuser based on selection
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
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      setCurrentUser(true);
      navigate("/admindash");
      navigate("/Dashboard")
      
    }).catch((error) => {
      console.error("Error logging in:", error);
    });
  }
  return (

      <div className={`Container ${isSignUpMode ? 'sign-up-mode':''}`} >
      <div class="forms--container">
        <div className="signin--signup">
        <form onSubmit={e => submitRegistration(e)} className="sign-up-form loginForm" action="#">
          <h1 className="Atitles">Create Account</h1>
          <div className="inputfield">
              <input className='Login-Input' placeholder=" "  type="text" id="firstname"
                       value={firstname}
                       onChange={(e) => setFirstname(e.target.value)} />
              <label className="label-line" >FirstName</label>
            </div>
            <div className="inputfield">
              <input className='Login-Input' placeholder=" "  type="text" id="lastname"
                       value={lastname}
                       onChange={(e) => setLastname(e.target.value)} />
              <label className="label-line" >LastName</label>
            </div>
           
            <div className="inputfield">
              <input className='Login-Input' placeholder=" "  type="text" id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)} />
              <label className="label-line" >Email</label>
              <box-icon name='envelope' color='white'></box-icon>
            </div>
            <div className="inputfield">
              <input className='Login-Input' placeholder=" "  type="password" id="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)} />
              <label className="label-line" >Password</label>
              <box-icon name='lock-alt'color='white'></box-icon>
            </div>
          
              <div className="inputfield">
      <select className='Login-Input' value={selectedItem} onChange={handleDropdownChange}>
        <option value="" disabled>Select User</option>
        {itemList.map((item, index) => (
          <option className="userfiled" key={index} value={item}>
            {item}
          </option>
        ))}

      </select>
    </div>
          <button className='btnn'>Sign Up</button>
        </form>
      
        <form onSubmit={submitLogin} className="sign-in-form loginForm" action="#">
        <h1 className="Atitles">Sign in</h1>
          <div className="inputfield">
              <input className='Login-Input' placeholder=" "  type="text" id="Admusername"
                       value={Admusername}
                       onChange={(e) => setAdmUsername(e.target.value)} />
              <label className="label-line" >Email</label>
              <box-icon name='envelope'color='white'></box-icon>
            </div>
            <div className="inputfield">
              <input className='Login-Input' placeholder=" "  type="password" id="Admpassword"
                       value={password}
                       onChange={(e) => setAdmPassword(e.target.value)} />
              <label className="label-line" >Password</label>
              <box-icon name='lock-alt'  color='white'></box-icon>
            </div>
            <div className="l67">
              <label>&emsp;<input type="checkbox" />Remember Me</label>&emsp;&emsp;
              <a href="#">Forgot Password?</a><br />
            </div>
          <button className='btnn'>Sign In</button>
          <button className='btnn'>Super user</button>
        </form>
      </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3 className='loginh3'>Don't have an account?</h3>
          {/*  <p className='loginp'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p> */} 
            <button className="btntransparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src="/img/dogLogin1.svg" class="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3 className='loginh3'>Already Registerd ?</h3>
            <button onClick={handleSignInClick} className="btntransparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="/img/dogLogin.svg" class="image" alt="" />
        </div>
      </div>
    </div>
    
    
  );
};

export default Admin1;
