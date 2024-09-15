import React, { useState, useEffect } from 'react';
import './Job.css';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';

function Job() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Define the Django backend endpoint for fetching job data
    const backendEndpoint = 'http://127.0.0.1:8000/api/jobpost/'; // Replace with your actual backend endpoint

    // Fetch data from the Django backend using Axios
    axios.get(backendEndpoint)
      .then(response => {
        // Update the state with the fetched job data
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching job data:', error);
      });
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className='bgcolor'>
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className='j1'>
            <form className='JobForm'>
              <h1 id='hire'> Jobs Get Hired Quickly</h1>
              
              {jobs.map(job => (
                <div key={job.id} className="j2">
                  <p><strong>Position:</strong> {job.Job_Title}</p>
                  <p><strong>Qualification:</strong> {job.Ideal_candidate}</p>
                  <p><strong>Requirement:</strong> {job.Job_Requirements}</p>
                  <p><strong>Job Type:</strong> {job.Job_Type}</p>
                  <p><strong>Job Location:</strong> {job.City}</p>
                  <p><strong>Salary:</strong> {job.Salary}</p>
                  <a className='link1' href={job.applyLink}>Apply</a>
                </div>
              ))}
              
            </form>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default Job;
