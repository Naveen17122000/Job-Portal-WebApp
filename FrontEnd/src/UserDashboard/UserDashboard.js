import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom';
import './UserDashboard.css';
import UserSidebar from './UserSidebar'
import UserHeader from './UserHeader';
import Setting from '../Dashboard/Setting';
import UserHome from './UserHome';
import Job from './Job';
import Resume from './Resume';

const UserDashboard = () => {
  return (
    <div className='UserDash-Layout' >
        <div className='UserDash-Sidebar'>
            <UserSidebar />
        </div>
        <div className='UserDash-Layout1'>
            <div className='UserDash-Navbar'>
                <UserHeader />
            </div>
            <div className='UserDash-Overview'>
            <Routes>
           {/* <Route path="/" element={<Overview />} /> */}
           <Route path="/" element={<UserHome/>} />
           <Route path="/UserDashboard/setting" element={<Setting />} />
           <Route path="/UserDashboard/job" element={<Job />} />
           <Route path="USerDashboard/resume" element={<Resume />} />
           </ Routes> 
           <Outlet />
            </div>
            
        </div>
            
    </div>
  )
}

export default UserDashboard
