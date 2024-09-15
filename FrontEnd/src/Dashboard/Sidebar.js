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
import './Sidebar.css'

const Sidebar = () => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/Dashboard", 
            name:"Overview",
           
        },
        {
            path:"/Dashboard/Accounts",
            name:"Account",
           
        },
        {
            path:"/analytics",
            name:"Analytics",
           
        },
        {
            path:"/comment",
            name:"Comment",
            
        },
        {
            path:"/product",
            name:"Product",
           
        },
        {
            path:"/Dashboard/Setting",
            name:"setting",
            
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "250px" : "70px"}} className="sidebar">
               <div className="top_section">
                   <div style={{marginLeft: isOpen ? "50px" : "50px"}} className="bars">
                       <FaBars onClick={toggle}/>
                       {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Job Portal</h1>     */}
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="dashlink" >
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
          
        </div>
       
    );
};

export default Sidebar;