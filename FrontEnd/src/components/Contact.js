import React from 'react';
import "./Contact.css";
import 'boxicons'
import { Link } from 'react-router-dom';
const Contact = () => {
  return (
    <div className='Contact'>
      <div className='head'>
        <h1>Contact Us</h1><br />
        <p>Job Portal</p>
      </div><br />
      <div className='contact'>
       <div className='contact-details'>    
      <h1>Contact Us</h1>
      <p>Thank you for taking the time to look at our website! 
        We hope you found our website to be informative and useful. 
        Please contact us using the information below if you have any questions about our services. 
        Here at Job Portal, we look forward to addressing your questions and offering excellent support.</p><br /> 
      <div className='address1'>
          <box-icon name='map' color="blue" size="cssSize"></box-icon> 
          <h1>Address:</h1>
          <p>V CUBE Software Solutions Pvt. Ltd., 
            Second Floor, Above Raymond's Clothing store, 
            K P H B Phase 1 , Kukatpally, Hyderabad, Telangana 500072</p>
        </div><hr />
        <div className='callus'>
        <box-icon type='solid' color="blue" name='phone'></box-icon>
        <h1>Call Us</h1>
        <p>123456789,789456123</p>
        </div><hr />
        <div className='email'>
        <box-icon name='envelope' color="blue" type='solid' ></box-icon>
        <h1>Email Us</h1>
        <p>career@jobportal.com</p><br /><hr /><br />
        </div>
        </div>
       <div className='contact-login'>
        <h1>Register Now</h1>
        <img src="./images/job.png" className="jobimg" alt="NO IMAGE" />
        <p>Please use the follwing link to Register</p>
        <Link to="/"><button type="submit" className="c-btn">Register</button></Link>
        </div> 
        </div>
        <div className='map'>
        <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" 
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=V%20CUBE%20Software%20Solutions%20PVT.%20LTD,%202nd%20Floor,%20above%20Raymond's%20Clothing%20Store,%20K%20P%20H%20B%20Phase%201,%20Kukatpally,%20Hyderabad,%20Telangana%20500072+(Job%20Paortal)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
          <a href="https://www.maps.ie/population/">Population calculator map</a></iframe></div>
      </div>
    
    
 
  )
};
export default Contact;
