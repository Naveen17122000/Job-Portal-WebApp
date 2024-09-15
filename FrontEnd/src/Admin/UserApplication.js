import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserApplication.css';
import { Link,useNavigate } from 'react-router-dom';
import Header from './Header';
import AdSidebar from './AdSidebar';
import { useParams } from 'react-router-dom';

function UserApplication() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [error, setError] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const navigate = useNavigate();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/resume/?jobId=${jobId}`)  // Adjust the API endpoint to filter by jobId
      .then(response => {
        setApplications(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, [jobId]); 

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
  };

  const handleCloseDetails = () => {
    setSelectedApplication(null);
  };

  return (
    <>  
      <div className='Hgrid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <AdSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>

        <div className='user-box'>
          <Link to="/admindash"><button className='bback'>Back</button></Link>
          <h1>User Applications for Job ID: {jobId}</h1><br /><br />

          <table className='table'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Surname</th>
                <th>Location</th>
                <th>Job Position/Title</th>
                <th>Application Date</th>
                <th>Applicant</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(application => (
                <tr key={application.id}>
                  <td>{application.firstName}</td>
                  <td>{application.surname}</td>
                  <td>{application.location}</td>
                  <td>{application.jobPosition}</td>
                  <td>{application.applicationDate}</td>
                  <td>{application.applicant}</td>
                  <td>
                    <button onClick={() => handleViewDetails(application)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedApplication && (
          <div className='user-details'>
            <h2>User Details</h2>
            <p><strong>First Name:</strong> {selectedApplication.firstName}</p>
            <p><strong>Surname:</strong> {selectedApplication.surname}</p>
            <p><strong>Location:</strong> {selectedApplication.location}</p>
            {/* Add more details as needed */}
            <button onClick={handleCloseDetails}>Close Details</button>
          </div>
        )}

      </div>
    </>
  );
}

export default UserApplication;
