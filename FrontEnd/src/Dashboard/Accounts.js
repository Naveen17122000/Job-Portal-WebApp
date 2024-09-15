import React, { useState } from 'react';
import axios from 'axios';
import './Account.css';

const Account = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    qualification: '',
    skills: '',
    languages: '',
    bio: '',
    resume: null,
  });

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = () => {
    // Create a FormData object to send the data as a multipart/form-data
    const data = new FormData();

    // Append each field to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Make an API call to the server to update the data
    axios.post('http://127.0.0.1:8000/api/userupdate/<int:pk>', data)
      .then((response) => {
        console.log('Update successful:', response.data);

        // Optionally, you can clear the form after a successful update
        setFormData({
          firstName: '',
          lastName: '',
          qualification: '',
          skills: '',
          languages: '',
          bio: '',
          resume: null,
        });
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <div>
      <label className='g1'>
        <h2>General Setting</h2>
      </label>
      <div className='box523'>
        <div className='box642'>
          <input
            className='g2'
            name='firstName'
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            className='g2'
            name='lastName'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <input
            className='g2'
            name='qualification'
            placeholder='Qualification'
            value={formData.qualification}
            onChange={handleInputChange}
          />
          <input
            className='g2'
            name='skills'
            placeholder='Skills'
            value={formData.skills}
            onChange={handleInputChange}
          />
          <input
            className='g2'
            name='languages'
            placeholder='Languages'
            value={formData.languages}
            onChange={handleInputChange}
          />
          <input
            className='g2'
            name='bio'
            placeholder='Bio'
            value={formData.bio}
            onChange={handleInputChange}
          />
          <h2 className='g4'>Update Resume:</h2>
          <input
            className='g2'
            type='file'
            name='resume'
            placeholder='Resume'
            onChange={handleInputChange}
          />
        </div>
        <button className='g6' onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Account;
