import React from "react";
import "./Admin.css";
import { useState } from "react";
import classnames from "classnames";



const Admin = () => { 
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Admusername, setAdmUsername] = useState('');
  const [Admpassword, setAdmPassword] = useState('');
 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Firstname:', firstname);
    console.log('Lastname:', lastname);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('AdmUsername:', Admusername);
    console.log('AdmPassword:', Admpassword);
  };

  const [swapPanel, setSwapPanel] = useState(false);
  const signUpButton = () => {
    setSwapPanel(true);
  };
  const signInButton = () => {
    setSwapPanel(false);
  };

  const handleDropdownChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <div className="admin-form">
      <div
        className={classnames("Container", { "right-panel-active": swapPanel })}
        id="container" >
      <div class="form-container sign-up-container">
        <form onSubmit={handleSubmit} className="AdminForm" action="#">
          <h1>Create Account</h1>
          <div className="inputfield">
              <input className='Login-Input' placeholder=" "  type="text" id="firstname"
                       value={firstname}
                       onChange={(e) => setFirstname(e.target.value)} />
              <label className="labelline" >FirstName</label>
            </div>
            <div className="inputfield">
              <input className='Login-Input' placeholder=" "  type="text" id="lastname"
                       value={lastname}
                       onChange={(e) => setLastname(e.target.value)} />
              <label className="labelline" >LastName</label>
            </div>
            <div className="inputfield">
              <input className='Login-Input' placeholder=" "  type="text" id="username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)} />
              <label className="labelline" >Email</label>
              <box-icon name='envelope'></box-icon>
            </div>
          
          <button className='btnn'>Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form onSubmit={handleSubmit} className="AdminForm" action="#">
          <h1 id="head">sign in</h1>
          <div className="inputfield">
              <input className='Login-Input' placeholder=" "  type="text" id="Admusername"
                       value={username}
                       onChange={(e) => setAdmUsername(e.target.value)} />
              <label className="labelline" >Email</label>
              <box-icon name='envelope'></box-icon>
            </div>
            <div className="inputfield">
              <input className='Login-Input' placeholder=" "  type="password" id="Admpassword"
                       value={password}
                       onChange={(e) => setAdmPassword(e.target.value)} />
              <label className="labelline" >Password</label>
              <box-icon name='lock-alt'></box-icon>
            </div>
            <div className="l-remember-forgot">
              <label>&emsp;&emsp;<input type="checkbox" />Remember Me</label>&emsp;
              <a href="#">Forgot Password?</a><br />
            </div>
          <button className='btnn'>Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h2>Welcome Back !</h2>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button class="btn" onClick={signInButton}id="signIn">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h2>Hello, Friend !</h2>
            <p>Enter your personal details and start journey with us</p>
            <button class="btn" onClick={signUpButton} id="signUp"><Link to="/admindash">Sign Up</Link></button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Admin;
