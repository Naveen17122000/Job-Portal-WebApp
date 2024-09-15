import React, { useState } from 'react';
import axios from 'axios';
import './Resume.css';

const Resume = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    Mobile_number: '',
    Qualification: '',  
    Address: '',  
    skills: '',
    languages: '',
    bio: '',
    resume: null,
    url:'',
  });
  const [link, setLink] = useState('');

  const handleInputChange = (e) => {
    const { name, type } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.resume) {
      alert('Please select a file for updateresume.');
      console.log('Link submitted:', link);
      return;
    }
  
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

      axios.post('http://127.0.0.1:8000/api/resume/', data, {
        headers:{
          'Content-Type' : 'multipart/form-data',
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log('Error updating Resume:', error.message);
          console.log(formData)
        });
  };
   
  return (
    <div className="r1">
      <h2 className='r2'>Update Resume</h2><br /><br />
      <form onSubmit={handleSubmit}>
        <div className="r3">
          <input className="r3s"
            type="text"
            name="first_name"
            placeholder='First Name'
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="r4">
          <input className="r3s"
            type="text"
            name="last_name"
            placeholder='Second Name'
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="r5">
          <input className="r3s"
            type="email"
            name="email"
            placeholder='Email'
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="r5">
          <input className="r3s"
            type="tel"
            name="Mobile_number"
            placeholder='Mobile Number'
            value={formData.Mobile_number}
            onChange={handleInputChange}
          />
        </div>
        <div className="r5">
          <input className="r3s"
            type="text"
            name="Qualification"
            placeholder='Qualification'
            value={formData.Qualification}
            onChange={handleInputChange}
          />
        </div>
        <div className="r5">
          <input className="r3s"
            type="text"
            name="Address"
            placeholder='Address'
            value={formData.Address}
            onChange={handleInputChange}
          />
        </div>
        <div className="r5">
          <input className="r3s"
            type="text"
            name="skills"
            placeholder='Skills'
            value={formData.skills}
            onChange={handleInputChange}
          />
        </div>
        <div className="r5">
          <input className="r3s"
            type="text"
            name="languages"
            placeholder='LanguagesKnown'
            value={formData.languages}
            onChange={handleInputChange}
          />
        </div>
        <div className="r5">
          <input className="r3s"
            type="text"
            name="bio"
            placeholder='Bio'
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>
        <div className="r5">
          <input className="r3s"
            type="url"
            name="url"
            placeholder="Enter link here"
            value={formData.url}
            onChange={handleInputChange}
          />
        </div>
        <div className="r5">
          <input className="r3s"
            type="file"
            name="resume"
            placeholder='Update Resume'
            // value={formData.updateresume}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" className="r6">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Resume;
