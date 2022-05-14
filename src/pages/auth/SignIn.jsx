import React from 'react'
import { useState } from 'react'
import httpClient from '../../axiosConfig'
import { useNavigate, Link } from "react-router-dom"

function SignIn() {
  let navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [signInErrors, setSignInErrors] = useState(false)
  const { email, password, confirm_password } = form

  const onChange = e => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    setSignInErrors(false)
    e.preventDefault()
    try {
      const response = await httpClient.post('login', form)
      navigate('/')
    } catch (error) {
      setSignInErrors(true)
    }
  }
  
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded"
                        id="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email" />

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mt-4"
                        id="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password" />
                    { signInErrors && 
                      <span className='text-red-500'>Bad User Credentials</span>
                    }
                    
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
                        onClick={onSubmit}
                    >Sign In</button>
                </div>

                <div className="text-grey-dark mt-6">
                    Does not have an account yet?
                    <Link className="no-underline border-b border-blue text-blue ml-2" to="/sign-up">
                      Sign Up
                    </Link>.
                </div>
            </div>
        </div>
  )
}

export default SignIn