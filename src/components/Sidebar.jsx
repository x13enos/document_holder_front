import React from 'react';
import { Link } from 'react-router-dom';
import { CgFolder, CgBox, CgTag } from 'react-icons/cg';

function SidebarLink ({ title, icon, link }) {
  return (
    <>
      <li>
        <Link 
          to={link}
          className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span className="inline-flex items-center h-12 w-8 text-lg text-gray-400">{icon}</span>
          <span className="text-sm font-medium">{title}</span>
        </Link>
      </li>
    </>
  )
}

function Sidebar({ currentUser }) {
  return (
    <>
      <div className="grid grid-rows-6 w-56 bg-white overflow-hidden border-r min-h-screen">
        <div className='flex row row-span-5 flex-col'>
          <div className="flex items-center justify-center h-20 shadow-md">
            <span className='font-bold text-lg'>Document Holder</span>
          </div>
          <ul className="flex flex-col p-4 items-start">
            <SidebarLink link="/" title="Documents" icon={<CgFolder />} />
            <SidebarLink link="/boxes" title="Boxes" icon={<CgBox />} />
            <SidebarLink link="/tags" title="Tags" icon={<CgTag />} />
          </ul>
        </div>
        <div className="row row-span-1 flex p-4 items-end">
          <Link className='flex' to="/profile">
            <div className='avatar placeholder'>
              <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                {currentUser.email.slice(0, 2)}
              </div>
            </div>
            <div className='ml-1 mt-1'>{currentUser.email}</div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar