import { useState, useCallback, useEffect } from 'react'
import httpClient from '../axiosConfig'

function BoxForm({ addBox, updateBox, box = {}, cancel }) {
  const COLORS = [
    "00A5E3", "FF5768", "FC6238", "C05780", "00B0BA",
    "4DD091", "FFEC59", "FFA23A"
  ]
  
  const [valid, setValid] = useState(false);
  const [form, setForm] = useState({ name: box.name || '', color: box.color || 'C0C0C0' });
  const [dropdownStyle, setDropdownStyle] = useState({ backgroundColor: '#C0C0C0' });
  const [uploadStatus, setUploadStatus] = useState(false);

  useEffect(() => {
    setValid(!!form.name)
  }, [form.name]);

  useEffect(() => { 
    setDropdownStyle({...dropdownStyle, backgroundColor: `#${form.color}` });
  }, [form.color])

  const onChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value})
  }

  const create = async () => {
    setUploadStatus(true);
    const response = await httpClient.post('/boxes', form);
    addBox(response.data);
    setForm({ name: '', color: 'C0C0C0' });
    setUploadStatus(false);
  }

  const update = async () => {
    setUploadStatus(true);
    const response = await httpClient.put(`/boxes/${box.id}`, form);
    updateBox(response.data);
    setForm({ name: '', color: '' });
    cancel();
  }
  
  return (
    <form action="#" method="POST" className={ uploadStatus ? "cursor-not-allowed" : "" }>
      <div className='flex flex-row'>
        <input
          placeholder="Name"
          type="text" 
          name="name" 
          id="name"
          disabled={uploadStatus}
          value={form.name}
          onChange={onChange}
          className="input w-full input-sm max-w-xs border-gray-300 rounded-md border" />
        <div className="divider divider-horizontal" />
        <div className="dropdown">
          <div className="flex py-1 cursor-pointer" tabIndex="0">
            Color:
            <div className="w-5 h-5 mt-1 ml-2" style={dropdownStyle} />
          </div>
          <div className="dropdown-content menu p-4 shadow bg-base-100 rounded-box w-52" tabIndex="0">
            <div className="flex gap-x-1">
              { COLORS.map((color) => {
                const divStyles = { backgroundColor: `#${color}` }; 
                return <div
                  key={color}
                  className="w-5 h-5 cursor-pointer" 
                  onClick={ () => setForm({...form, color }) } 
                  style={divStyles} />
              })}
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal" />
        <button 
          onClick={ box.id ? update : create } 
          disabled={uploadStatus || !valid} 
          className="btn btn-sm btn-success ml-2">
            { box.id ? "Save" : "Add Box" }
        </button>
        { box.id &&
          <button onClick={ cancel } className="btn btn-sm ml-2">
            Cancel
          </button>
        }
      </div>
    </form>
  )
}

export default BoxForm;