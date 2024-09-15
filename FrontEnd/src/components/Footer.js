import React from 'react'
import "./Footer.css";
import { NavLink } from 'react-router-dom';
import "boxicons"
const Footer = () => {
  return (
    <div className='footer'>
       <div className='f-job'>
        <h1>Job</h1>
        <h2>Portal</h2>
        <h3>Find your Dream Job</h3>
        <h4>Build up your Career</h4>
        <p>Job Portal Can Assist you to Reach Your Goal</p>
        </div>
        <div className='f-links'>
        <ul>
            <li><box-icon name='right-arrow-alt'></box-icon><NavLink to="/">Home</NavLink></li>
            <li><box-icon name='right-arrow-alt'></box-icon><NavLink to="/about">About</NavLink></li>
            <li><box-icon name='right-arrow-alt'></box-icon><NavLink to="#">Services</NavLink></li>
            <li><box-icon name='right-arrow-alt'></box-icon><NavLink to="/contact">contact</NavLink></li>
          </ul>
        </div>
        <div className='f-address'>
                   <h1>Address:</h1>
                   <p>V CUBE Software Solutions Pvt. Ltd. second floor,above Raymond’s 
                        clothing store,KPHB Phase 1 Kukatpally, Hyderabad, Telangana 500072
                         <br />Contact us :<br/>
                          +917675070124/ <br /> +919059456742</p>
                          </div>
           <div className='f-socialmedia'>
            <h1>socialmedia</h1>
              <a
                href="https://www.facebook.com/VCubeSoftwareSolutions"
                target="_thapa">
                <box-icon type='logo' size="lg" name='facebook'></box-icon>
              </a>
              <a
                href="https://www.instagram.com/vcubesoftwaresolutions/"
                target="_thapa">
                <box-icon type='logo' size="lg" name='instagram'></box-icon>
              </a>
              <a
                href="https://www.youtube.com/@VCUBESoftwareSolutions"
                target="_thapa">
                <box-icon type='logo' size="lg" name='youtube'></box-icon>
              </a>
            </div> 
        </div>
      
   
  )
}

export default Footer
