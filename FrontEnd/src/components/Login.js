import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Login.css';
import 'boxicons';
import Home  from "./Home"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };
  return (
    <div className='Login'>
  {/*  <div className='home'>
     <img src="./images/job3.webp"  className="jobhome" />
    </div>*/} 
    <div className="lwrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="linput-box">
          <input
            type="text"
            placeholder="Username" required
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <box-icon type='solid' name='user' color="white"></box-icon>
        </div>
        <div className="linput-box">
          <input
            type="password"
            placeholder="Password" required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <box-icon type='solid' name='lock-alt' color="white"></box-icon>
        </div>      
      <div className="l-remember-forgot">
      <label>&emsp;<input type="checkbox" />Remember Me</label>&emsp;&emsp;
        <a href="#">Forgot Password?</a><br />
        </div> 
        <button type="submit" className="lbutton">Login</button>
        <div className="l-register-link"><br />
          <p>Dont have an account?<Link to="/register" className='ms-2' >Register</Link></p>
      </div>
      </form>
    </div>
    </div>
  );
}
export default Login;