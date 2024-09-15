import React, { useState, useEffect } from 'react';
import './UserHeader.css';
import 'boxicons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserHeader = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [userName, setUserName] = useState('');
  const [authToken, setAuthToken] = useState('');

  const navigate = useNavigate();

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/api/signout/', null, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          console.log(`Logout successful for user: ${userName}`);
          localStorage.removeItem('userToken');
          setAuthToken('');
          navigate('/');
        } else {
          console.log('Logout failed. Server response:', response);
        }
      })
      .catch(error => {
        console.error('Error during logout:', error.message);
      });
  };

  const fetchUserData = async () => {

    try {
      if (!authToken) {
        console.error('No authToken found. Unable to fetch user data.');
        return;
      }
      
      console.log('Fetching user data...');
      const response = await axios.get('http://127.0.0.1:8000/api/usersignin/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (response.status === 200) {
        console.log('User info fetched successfully:', response.data);
        setUserName(response.data.username);
      } else {
        console.error('Failed to fetch username. Server response:', response);
      }
    } catch (error) {
      console.error('Error during user data fetch:', error.message);
    }
  };
  
  useEffect(() => {
    const storedAuthToken = localStorage.getItem('authToken');
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
      console.log('Current authToken:', storedAuthToken);
      fetchUserData();
    }
  }, []); 

  return (
    <div className='User-Heade12r'>
      <div className="search-bo12x">
        <button className="btn-searc12h"><box-icon color='white' size='md' name='search' /></button>
        <input type="text" className="input-searc12h" placeholder="Type to Search..." />
      </div>
      <div className='User-log12o'><h1>Job Portal</h1></div>
      {userName && (
        <div className='User-Name'>
          <h1>Welcome {userName}</h1>
        </div>
      )}
      <div className='User-Logou12t' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {isHovering && (
          <div className='Logout-Hove12r'>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        <Link to='/'><box-icon name='log-out' size="lg"></box-icon></Link>
      </div>
    </div>
  );
};

export default UserHeader;
