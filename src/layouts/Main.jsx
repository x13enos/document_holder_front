import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import httpClient from '../axiosConfig';

const MainLayout = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (params = {}) => {
    const response = await httpClient.get('/users/current_user_info');
    setCurrentUser(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchUserData();
  } , []);
  
  return(
    <>
      { loading ? 
        <div className="spinner-container flex justify-center items-center h-screen">
          <div className="loading-spinner">
          </div>
        </div> :
        <div className="flex flex-row">
          <div><Sidebar currentUser={currentUser} /></div>
          <div className='mt-4 w-full'><Outlet /></div>
        </div>
      }

    </>
  )
}

export default MainLayout;