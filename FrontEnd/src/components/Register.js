import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css';
import 'boxicons'

function Signup() {
  return (
    <div className="rwrapper">
    <form>
      <h1>Sign Up</h1>
      <div className="rinput-box">  
          <input type="text" placeholder="First Name" className='form-control' />
      </div>
      <div className="rinput-box">
          <input type="text" placeholder="Last Name" className='form-control' />
      </div>
      <div className="rinput-box"> 
          <input type="text" placeholder="Enter Email" className='form-control' />
          <box-icon name='envelope' color="white" ></box-icon>
      </div>
      <div className="rinput-box">
          <input type="Password" placeholder="password" className='form-control' />
          <box-icon type='solid' name='lock-alt' color="white"></box-icon>
      </div>
      <button type="submit" className="rbtn">Submit</button>
      <div className="r-register-link">
      <p>Already Registerd ?<Link to="/" className='ms-2'>Login</Link></p></div>
    </form>
    
  </div>
  )
}

export default Signup
