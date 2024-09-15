import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div className='Navbar'>
      <div className='Nav-head'>
    <h1>Job Portal</h1></div>
    <Link to = "/"><button className='logout'>Logout</button></Link>
    </div>
  )
}

export default NavBar
