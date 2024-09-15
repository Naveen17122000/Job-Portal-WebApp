import React from 'react'
import './PersonalDetails.css'
const PersonalDetails = () => {
  return (
    <div className='PersonalDetails'>
        <div className='Contact-info'>
        <div className="Cfield"><table>
            <tr><td><input className='CInput' placeholder=" " type="text"/>  
              <label className="Clabel" >Contact Phone</label></td>
              <td><input className='CInput' placeholder=" " type="text"/>  
              <label className="Clabel" >Email</label></td></tr></table>
        </div>
        <div className='cprofile'>
        <input className='CInput' placeholder=" " type="text"/>  
            <label className="Clabel" >Profil URL</label>
        </div>
        <div className='cprofile'>
        <input className='CInput' placeholder=" " type="text"/>  
            <label className="Clabel" >Address</label>
        </div>
        </div>
      
    </div>
  )
}

export default PersonalDetails
