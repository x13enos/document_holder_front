import { useState, useEffect } from 'react'
import httpClient from '../axiosConfig'

function TagForm({ addTag, updateTag, tag = {}, cancel }) {

  const [valid, setValid] = useState(false);
  const [form, setForm] = useState({ name: tag.name || '' });
  const [uploadStatus, setUploadStatus] = useState(false);

  useEffect(() => {
    setValid(!!form.name)
  }, [form.name]);

  const onChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value})
  }

  const create = async () => {
    setUploadStatus(true);
    const response = await httpClient.post('/tags', form);
    addTag(response.data);
    setUploadStatus(false);
  }

  const update = async () => {
    setUploadStatus(true);
    const response = await httpClient.put(`/tags/${tag.id}`, form);
    updateTag(response.data);
    setForm({ name: '' });
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
        <button 
          onClick={ tag.id ? update : create } 
          disabled={uploadStatus || !valid} 
          className="btn btn-sm btn-success ml-2">
            { tag.id ? "Save" : "Add Tag" }
        </button>
        { tag.id &&
          <button onClick={ cancel } className="btn btn-sm ml-2">
            Cancel
          </button>
        }
      </div>
    </form>
  )
}

export default TagForm;