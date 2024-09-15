import React from 'react'
import './Hs.css'
import { Link } from 'react-router-dom';
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='Hheader'>
        <div className='Hmenu-icon'>
          
            <BsJustify className='Hicon' onClick={OpenSidebar}/>
        </div>
        <div className='Hheader-left'>
            <BsSearch  className='Hicon'/>
        </div>
        <div className='Hheader-right'>
            <BsFillBellFill className='Hicon'/>&nbsp;
            <BsFillEnvelopeFill className='Hicon'/>&nbsp;
            <BsPersonCircle className='Hicon'/>&nbsp;&nbsp;&nbsp;
            <Link to = "/"><button className='logout12'>Logout</button></Link>
        </div>
    </header>
  )
}

export default Header;
