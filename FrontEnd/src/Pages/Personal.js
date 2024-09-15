import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Personal.css';

function Personal() {
  const [userData, setUserData] = useState({
    first_name: '',
    Address: '',
    bio: '',
    languages: '',
    Mobile_number: '',
    email: '',
    url: '',
    Address: '',
  });

  useEffect(() => {
    // Fetch user resume data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios.get('http://127.0.0.1:8000/api/resume/')
      .then(function (response) {
        // Update the state with the received data
        setUserData(response.data);
      })
      .catch(function (error) {
        console.error('Error fetching user data:', error.message);
      });
  };

  return (
    <div>
      <div className='box100'>
        <div className='box101'>
          <label className='per09'>
            <h2>Personal Information</h2>
          </label>
          <input
            className='i1'
            placeholder='Name'
            value={userData.first_name}
            readOnly
          />
          <input
            className='i2'
            placeholder='Location'
            value={userData.Address}
            readOnly
          />
          <input className='i3' placeholder='Bio' value={userData.bio} readOnly />
          <input
            className='i4'
            placeholder='Languages'
            value={userData.languages}
            readOnly
          />
        </div>
        <div className='box102'>
          <label className='i5'>
            <h2>Contact Information</h2>
          </label>
          <input
            className='i6'
            placeholder='PhoneNumber'
            value={userData.Mobile_number}
            readOnly
          />
          <input
            className='i7'
            placeholder='Email'
            type='email'
            value={userData.email}
            readOnly
          />
          <input
            className='i8'
            placeholder='Profile URL'
            value={userData.url}
            readOnly
          />
          <input
            className='i9'
            placeholder='Address'
            value={userData.Address}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default Personal;
