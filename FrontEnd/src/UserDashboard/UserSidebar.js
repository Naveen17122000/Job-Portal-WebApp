import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './UserSidebar.css'

const Sidebar = () => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        
        {
            path:"/UserDashboard/home",
            name:"Home",
           
        },
        {
            path:"/UserDashboard/job",
            name:"Apply the Job",
           
        },
        {
            path:"/messages",
            name:"Messages",
            
        },
        {
            path:"/UserDashboard/resume",
            name:"Resume",
           
        },
        {
            path:"/UserDashboard/Setting",
            name:"Setting",
            
        }
    ]
    return (
        <div className="UserContainer12">
           <div style={{width: isOpen ? "200px" : "70px"}} className="UserSidebar12">
               <div className="User_top_section12">
                   <div style={{marginLeft: isOpen ? "0px" : "10px"}} className="UserBars12">
                       <FaBars onClick={toggle}/>
                       {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Job Portal</h1>     */}
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="UserDashlink12" >
                           <div className="UserIcon12">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="UserLink_text12">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
          
        </div>
       
    );
};

export default Sidebar;