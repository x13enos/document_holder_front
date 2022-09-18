import React, { useState } from 'react';
import httpClient from '../axiosConfig';
import { useOutletContext, useNavigate } from "react-router-dom";
import { BiEditAlt, BiCheck } from "react-icons/bi";

function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  const [pending, setPending] = useState(null);
  const [form, setForm] = useState({ 
    email: currentUser.email,
    password: "",
    passwordConfirmation: ""
  })

  const onChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
    setPending(true)
  }

  const logout = async () => {
    await httpClient.delete('/logout');
    navigate("/sign-in");
  }
  
  const update = async (e) => {
    e.preventDefault();
    await httpClient.put('/users/update_profile', form);
    setPending(false)
  }

  return (
    <>
      <div className='hidden lg:flex flex-col'>
        <div className="flex items-center h-20 lg:shadow-md">
          <span className='pl-4 font-semibold text-lg'>Your personal data</span>
        </div>
      </div>
      <div className="form-control w-full max-w-xs lg:mt-4 lg:ml-4 mx-auto">
        <span className='font-semibold text-lg lg:hidden mt-8 mb-2'>Your personal data</span>
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          value={form.email}
          onChange={onChange}
          name="email"
          type="text" 
          placeholder="Type here your email" 
          className="input input-bordered w-full max-w-xs"/>

        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          value={form.password}
          onChange={onChange}
          name="password"
          type="password" 
          placeholder="Type here your new password" 
          className="input input-bordered w-full max-w-xs" 
          />

        <label className="label">
          <span className="label-text">Password Confirmation</span>
        </label>
        <input
          value={form.passwordConfirmation}
          onChange={onChange}
          name="passwordConfirmation"
          type="password"
          placeholder="New password one more time"
          className="input input-bordered w-full max-w-xs" />

        <button className="btn btn-success mt-4" onClick={update}>
          Save
          { pending === true && <BiEditAlt size="1.5em" className='ml-2'/> }
          { pending === false && <BiCheck size="1.5em" className='ml-2'/> }
        </button>
        <button className="btn mt-4" onClick={logout}>Log out</button>
      </div>
    </>
  )
}

export default Profile;