import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Dashboard/Sidebar'
import Box from '@mui/material/Box';
import NavBar from '../Dashboard/NavBar';
import './AddJob.css';
import '../Dashboard/Dashboard.css'
import Header from './Header';
import AdSidebar from './AdSidebar';
import { Link } from 'react-router-dom';

function AddJob({ job, onClose }) {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
        const OpenSidebar = () => {
          setOpenSidebarToggle(!openSidebarToggle)
        }
        const [formData, setFormData] = useState({
                Job_Title: job ? job.jobTitle : '',
                Salary: job ? job.salary : '',
                City: job ? job.location : '',
                State: job ? job.state : '',
                Industry: job ? job.industry : '',
                Job_Type: job ? job.jobType : '',
                Job_Requirements: job ? job.jobRequirements : '',
                Ideal_candidate: job ? job.idealCandidate : '',
                is_active: job ? job.is_active : true,
          });

    const [is_active, setis_active] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (job && job.isEdit) {
          // If the job is in edit mode, update the form data
          setFormData({
            Job_Title: job.jobTitle,
            Salary: job.salary,
            City: job.location,
            State: job.state,
            Industry: job.industry,
            Job_Type: job.jobType,
            Job_Requirements: job.jobRequirements,
            Ideal_candidate: job.idealCandidate,
            is_active: job.is_active,
          });
        }
      }, [job]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const dataToSend = [formData];  // Wrap the formData in a list

        axios
            .post('http://127.0.0.1:8000/api/jobpost/', dataToSend)
            .then((response) => {
                // handle success
                setSuccessMessage('Job successfully posted');
                setErrorMessage('');
                console.log('Data successfully posted:', response.data);
            })
            .catch((error) => {
                // handle error
                setSuccessMessage('');
                setErrorMessage('Error posting job: ' + error.message);
                console.error('Error posting data:', error.response); // Log the full response object
                alert('Error posting job: ' + error.message);
            });
        
            
    };

    const handleChange = (e) => {
        const { id, type, value, checked } = e.target;
        if (id === 'is_active') {
            setis_active(checked);
            setFormData((prevData) => ({ ...prevData, [id]: checked }));
        } else {
            const newValue = type === 'checkbox' ? checked : value;
            setFormData((prevData) => ({ ...prevData, [id]: newValue }));
        }
    };


    return (
        <div className='Hgrid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <AdSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          
             {/* <NavBar />
        <Box height={30} />
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
                <div className='create'>
                <Link to="/admindash"><button className='back'>Back</button></Link>
                    <form className='form' onSubmit={handleFormSubmit}>
                    <h2>{job && job.isEdit ? 'Update Job' : 'Add Job'}</h2>
                        <div className='grid-container'>
                        <div className='grid-item1'>
                            <input className='create-fields1' type='text' placeholder=" " id="Job_Title"  value={formData.Job_Title}  onChange={handleChange}/>
                            <label className='labels' htmlFor="jobTitle">Job Title</label>
                        </div>
                        <div className='grid-item1'>
                            <input className='create-fields1' type='text' placeholder=" " id="Salary" value={formData.Salary}  onChange={handleChange}/>
                            <label className='labels' htmlFor="salary">Salary</label>
                        </div>
                        <div className='grid-item1'>
                            <input className='create-fields1' type='text' placeholder=" " id="City" value={formData.City}  onChange={handleChange}/>
                            <label className='labels' htmlFor="city">City</label>
                        </div>
                        <div className='grid-item1'>
                            <input className='create-fields1' type='text' placeholder=" " id="State" value={formData.State}  onChange={handleChange}/>
                            <label className='labels' htmlFor="state">State</label>
                        </div>
                        <div className='grid-item1'>
                            <input className='create-fields1' type='text' placeholder=" " id="Industry" value={formData.Industry}  onChange={handleChange}/>
                            <label className='labels' htmlFor="industry">Industry</label>
                        </div>
                        <div className='grid-item1'>
                            <input className='create-fields1' type='text' placeholder=" " id="Job_Type" value={formData.Job_Type}  onChange={handleChange}/>
                            <label className='labels' htmlFor="jobType">Job Type</label>
                        </div>
                        </div>
                        <div>
                            <textarea  className='text'id="Job_Requirements" placeholder=" "  value={formData.Job_Requirements} onChange={handleChange}/>
                            <label className='labels' htmlFor="JobRequirements">Job Requirements</label>
                        </div>
                        <div>
                            <textarea className='text' id="Ideal_candidate" placeholder=" " value={formData.Ideal_candidate} onChange={handleChange} />
                            <label className='labels' htmlFor="idealCandidate">Ideal Candidate</label>
                        </div>
                        <div className='check-box' >
                            <input type="checkbox" id="is_active" onChange={handleChange} checked={formData.is_active}/>
                            <label htmlFor="is_active">Is this Job Available</label>
                        </div>
                        <button className='job-btn'>{job && job.isEdit ? 'Update' : 'Submit'}</button>
                    </form>
                </div>
            {/* </Box>
        </Box>*/}
    </div> 
   
    );

    }

export default AddJob;