import React, { useEffect, useState } from 'react'
import "./Profile.css";
import axios from 'axios';

const Profile = () => {

  const [userData,setUserData] = useState(null)
  const [loading,setLoading] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/resume/')
      .then(res =>{
        setUserData(res.data)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  },[]);

  return (
    <div className='Profiles'>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {userData &&(
      <div className='Profile'>
        <h1>{userData.first_name}</h1><hr />
        <h1><box-icon type='solid' name='envelope' size="lg"></box-icon>{userData.email}</h1><hr />
        <h1><box-icon name='mobile' size="lg"></box-icon>(+91) {userData.Mobile_number}</h1><hr />
        <h1><box-icon name='map' type='solid' size="lg"></box-icon>{userData.Address}</h1>
      </div>
      )}
      <div className='About'>
        <div className='about-me'>
          <h1>About me</h1><hr />
          <p>{userData && userData.bio}</p>
        </div>
        <div className='details'>
        <h1>Details</h1><hr />
        <table>
          <tr>
            <td>Name:<hr /></td>
            <td>{userData && userData.first_name}<hr /></td>
          </tr>
          <tr>
            <td>Email<hr /></td>
            <td>{userData && userData.email}<hr /></td>
          </tr>
          <tr>
            <td>Address:<hr /></td>
            <td>{userData && userData.Address}<hr /></td>
          </tr>
          <tr>
            <td>Qualification:<hr /></td>
            <td>{userData && userData.Qualification}<hr /></td>
          </tr>
          <tr>
            <td>Languages<hr /></td>
            <td>{userData && userData.languages}<hr /></td>
          </tr>
        </table>
        </div>
      </div>
    </div>
  )
}

export default Profile;
