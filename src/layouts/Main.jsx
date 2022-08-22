import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import httpClient from '../axiosConfig';
import { CgMenu } from 'react-icons/cg';

const MainLayout = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [modalData, setModalData] = useState({ show: false, content: "" });
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
          <div className="loading-spinner" />
        </div> :
        <div className="drawer drawer-mobile">
          { modalData.show && <>
              {modalData.content}
              <div className="opacity-25 fixed inset-0 z-40 bg-black" />
            </> }
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className='drawer-side'>
            <label htmlFor="my-drawer" className="drawer-overlay z-10" />
            <Sidebar currentUser={currentUser} />
          </div>
          <div className='drawer-content'>
            <div className="grid grid-cols-6 items-center h-20 shadow-md lg:hidden">
              <span className='font-bold text-lg col-span-5 ml-8'>Document Holder</span>
              <label htmlFor="my-drawer" className="btn btn-square btn-ghost col-span-1">
                <CgMenu className="w-6 h-6" />
              </label>
            </div>
            <Outlet context={{ currentUser, setModalData }} />
          </div>
        </div>
      }

    </>
  )
}

export default MainLayout;