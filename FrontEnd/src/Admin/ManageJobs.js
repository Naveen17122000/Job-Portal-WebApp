// ManageJobs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageJob.css';
import { Link, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import AdSidebar from './AdSidebar';
import AddJob from './AddJob';
import UserApplication from './UserApplication'; 

function ManageJobs() {
  const [jobData, setJobData] = useState([]);
  const [error, setError] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/jobpost/')
      .then((response) => {
        setJobData(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleViewApplicants = (job) => {
    navigate(`/userapplication/${job.id}`); // Redirect to UserApplication with dynamic data
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
  };

  const handleUpdateStatus = (job) => {
    // Additional logic to update job status (active or inactive)
    const updatedJob = { ...job, is_active: !job.is_active };

    axios.put(`http://127.0.0.1:8000/api/jobpost/${job.id}/`, updatedJob)
      .then((response) => {
        console.log('Job status updated successfully:', response.data);
        setJobData(response.data);
        
        setJobData((prevJobData) =>
        prevJobData.map((j) => (j.id === job.id ? response.data : j))
      );
      })
      .catch((error) => {
        console.error('Error updating job status:', error);
        setError(error);
      });
  };

  return (
    <>
      <div className='Hgrid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <AdSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>

        <div className='box-body'>
          <Link to="/admindash"><button className='back'>Back</button></Link>
          <table className='job'>
            <h1>Manage Job</h1>
            <tbody>
              <tr>
                <th>Job Title</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Applicants</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              {jobData.map((job, index) => (
                <tr key={index}>
                  <td>{job.jobTitle}</td>
                  <td>{job.location}</td>
                  <td>{job.salary}</td>
                  <td>{job.applicants}
                  <button onClick={() => handleViewApplicants(job)}>
                      View Applicants
                    </button></td>
                  <td>{job.status}</td>
                  <td>
                   
                    <button onClick={() => handleUpdateStatus(job)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Routes>
            <Route path="/userapplication/:jobId" element={<UserApplication />} />
          </Routes>
          {selectedJob && (
            <AddJob job={selectedJob} onClose={handleCloseDetails} />
          )}
        </div>
      </div>
    </> 
  );
}

export default ManageJobs;
