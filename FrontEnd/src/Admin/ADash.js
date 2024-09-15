import React from 'react'
import AdSidebar from './AdSidebar'
import Header from './Header'
import Home from './Home'
import { useState } from 'react'
import './Hs.css';
function ADash (){
    
        const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
        const OpenSidebar = () => {
          setOpenSidebarToggle(!openSidebarToggle)
        }
  return (
      <div className='Hgrid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <AdSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
       </div>
      
    
  )
}

export default ADash;
