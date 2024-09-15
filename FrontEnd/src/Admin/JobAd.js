import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobAd.css';

function JobAd() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    salary: '',
    city: '',
    state: '',
    industry: '',
    jobType: '',
    jobRequirements: '',
    idealCandidate: '',
  });

  const [isJobAvailable, setIsJobAvailable] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 


  useEffect(() => {
    if (successMessage) {
      setFormData({
        jobTitle: '',
        salary: '',
        city: '',
        state: '',
        industry: '',
        jobType: '',
        jobRequirements: '',
        idealCandidate: '',
      });
      setIsJobAvailable(false);
      alert('Job successfully posted');
    }
  }, [successMessage]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      isJobAvailable: isJobAvailable,
    };

    axios
      .post('HTTP URL', dataToSend)
      .then((response) => {
        setSuccessMessage('Job successfully posted');
        setErrorMessage('');
        console.log('Data successfully posted:', response.data);
      })
      .catch((error) => {
        setSuccessMessage('');
        setErrorMessage('Error posting job: ' + error.message);
        console.error('Error posting data:', error);
        alert('Error posting job: ' + error.message);
      });
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    if (id === 'isJobAvailable') {
      setIsJobAvailable(checked);
    } else {
      const newValue = type === 'checkbox' ? checked : value;
      setFormData((prevData) => ({ ...prevData, [id]: newValue }));
    }
  };


    return (<>
        <div className='create'><h3>CREATE A JOB AD</h3></div>
        <form onSubmit={handleFormSubmit}>

            <div className='Job'>
                <label htmlFor="jobTitle">Job Title</label><br />
                    <input type='text' id="jobTitle" /><br />
                <label htmlFor="salary">Salary</label><br />
                    <input type='text' id="salary" /><br />
                <label htmlFor="city">City</label><br />
                    <input type='text' id="city" /><br />
                <label htmlFor="state">State</label><br />
                    <input type='text' id="state" /><br />
                <label htmlFor="industry">Industry</label><br />
                    <input type='text' id="industry" /><br />
                <label htmlFor="jobType">Job Type</label><br />
                    <input type='text' id="jobType" /><br />
                <label htmlFor="jobRequirements">Job Requirements</label><br />
                    <textarea id="jobRequirements" /><br />
                <label htmlFor="idealCandidate">Ideal Candidate</label><br />
                    <textarea id="idealCandidate" /><br />
                <label htmlFor="isJobAvailable">Is this Job Available</label>
                    <input
                        type="checkbox"
                        id="isJobAvailable"
                        onChange={handleChange}
                        checked={isJobAvailable}/><br /><br />
                <button>Submit</button>
            </div>
        </form>

    </>

    );

}

export default JobAd;