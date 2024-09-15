import logo from './logo.svg';
import './App.css';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
// import Home1 from './Dashboard/Home1';
import Sliding from './components/Sliding';
import { Routes, Route, useLocation ,Link } from 'react-router-dom';
import React, { useRef, useEffect } from 'react';
import Header from "./components/Header";
import Admin1 from './Admin/Admin1';
import ADash from './Admin/ADash';
import Footer from './components/Footer';
import Dashboard from './Dashboard/Dashboard'
import Overview from './Dashboard/Overview';
import Account from './Dashboard/Accounts';
import Setting from './Dashboard/Setting';
import AddJob from './Admin/AddJob';
import ManageJobs from './Admin/ManageJobs';
import UserApplication from './Admin/UserApplication';
import ASetting from './Admin/ASetting'
import UserDashboard from './UserDashboard/UserDashboard';
import Job from './UserDashboard/Job';
import UserHome from './UserDashboard/UserHome';
import Resume from './UserDashboard/Resume';

function App() {
  let location = useLocation();
  {/* const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");


 sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});  */}
  return (

    <div className='Apps'>
      <div className='bg'>
        {/* {window.location.pathname !== "/contact" && location.pathname !== "/" && location.pathname !== "/admindash" ? (<NavBar />) : null} */}
        {window.location.pathname === "/contact" || location.pathname === "/" ||location.pathname === "/admin" ? (<Header />) : null}
        <nav>
            <Link to="Dashboard"></Link>
        </nav>
        <Routes>
          <Route path='/' element={<Sliding />}></Route>
          <Route path='/admin' element={<Admin1 />}></Route>
          {/*<Route path='/' element={<><Home /><Login /></>}></Route>
           <Route path='/register' element={<><Home /><Register/></>}></Route>*/}
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />   
          <Route path="/dashboard/overview" element={<Overview />} /> */}
          <Route path="/Dashboard" element={<Dashboard />}>
          <Route path="Overview" element={<Overview />} /> 
          <Route path="Accounts" element={<Account />} />
          <Route path="Setting" element={<Setting />} />
        </Route>   
        <Route path="/admindash" element={<ADash/>} />
        <Route path="/addjob" element={<AddJob />} />
        <Route path="/managejob" element={<ManageJobs />} />
        <Route path="/userapplication" element={<UserApplication/>} />
        <Route path="/asetting" element={<ASetting />} />
        <Route path="/UserDashboard"  element={<UserDashboard />}>
        <Route path='Setting' element={<Setting />}/>
        <Route path="Job" element={<Job />} />
        <Route path="home" element={<UserHome/>} />
        <Route path="resume" element={<Resume />} />
        </Route>
        </Routes>
        
        {window.location.pathname === "/contact" || location.pathname === "/" ||location.pathname === "/admin" ? (<Footer />) : null}
      </div>
    </div>

  );

}

export default App;



 