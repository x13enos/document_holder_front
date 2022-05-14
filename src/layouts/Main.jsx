import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout =() =>{
  return(
    <>
      <div className="flex flex-row">
        <div><Sidebar /></div>
        <div className='mx-8 mt-4 w-full'><Outlet /></div>
      </div>
    </>
  )
}

export default MainLayout;