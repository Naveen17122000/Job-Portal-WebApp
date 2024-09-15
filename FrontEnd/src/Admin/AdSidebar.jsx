import React from 'react'
import './Hs.css'
import { Link } from 'react-router-dom'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
//  import images from './logo.jpg';

function AdSidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="Hsidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='Hsidebar-title'>
            <div className='Hsidebar-brand'>
                <div className="Hicon_header">
                {/* <img src={images} className="icon"/>*/}
                JOB PORTAL 
                </div>
            </div>
            <span className='Hicon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='Hsidebar-list'>
            <li className='Hsidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='Hicon'/> Dashboard
                </a>
            </li>
            <li className='Hsidebar-list-item'>
               
                    <BsFillArchiveFill className='Hicon'/> <Link className="Jobadd" to="/addjob">Add Job</Link>
               
            </li>
            <li className='Hsidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='Hicon'/> Categories
                </a>
                
            </li>
            <li className='Hsidebar-list-item'>
                <a href="">
                    <BsListCheck className='Hicon'/> <Link className="Jobadd" to="/managejob">Posts & Activity</Link>
                </a>
            </li>
            <li className='Hsidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='Hicon'/> <Link className='Jobadd' to="/userapplication">Reports</Link>
                </a>
            </li>
            <li className='Hsidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='Hicon'/> <Link className="Jobadd" to="/asetting">Setting & Privacy</Link>
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default AdSidebar;