import React from 'react'
import { useState, useEffect } from 'react'
import httpClient from '../axiosConfig'

function DocumentForm() {
  const [form, setForm] = useState({
    name: ''
  })

  const onChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value})
  }

  const create = async () => {
    const response = await httpClient.post('/documents', form)
    setForm({ name: '' })
  }

  // useEffect(() => {
  //   const { asset, expense } = categories() 
  //   setForm({ ...form, credit: asset, debit: expense })
  // }, [assets, expenses])
  
  return (
    <form action="#" method="POST">
      <div className='flex flex-row border rounded p-2 '>
        <div className='flex'>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            type="text" 
            name="name" 
            id="name"
            value={form.name}
            onChange={onChange}
            className="mt-1 p-1 pl-2 ml-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" />
        </div>

        <button 
          type="button" 
          className="mr-4 ml-2 mb-2 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
          onClick={create}>
            Add
        </button>
      </div>
    </form>
  )
}

export default DocumentForm;