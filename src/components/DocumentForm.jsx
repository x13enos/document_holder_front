import { useState, useCallback, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import httpClient from '../axiosConfig'

function DocumentForm({ addDocument, updateDocument, document, boxes }) {
  
  const [valid, setValid] = useState(false)
  const [form, setForm] = useState({ name: '', boxId: '' });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(false);

  useEffect(() => {
    setValid(!!form.name && images.length > 0)
  }, [form.name, images]);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const dataUrl = reader.result
        setPreviews(oldPreviews => [...oldPreviews, dataUrl])
      }
      reader.readAsDataURL(file);
    })
    setImages(oldImages => [...oldImages, ...acceptedFiles])
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  const onChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value})
  }

  const create = async () => {
    setUploadStatus(true);
    let data = new FormData();
    data.append('name', form.name);
    data.append('box_id', form.boxId);
    images.forEach(i => data.append('images[]', i));
    const response = await httpClient.post('/documents', data);
    addDocument(response.data);
    setForm({ name: '', boxId: '' });
    setImages([]);
    setPreviews([]);
    setUploadStatus(false);
  }
  
  return (
    <form className={ uploadStatus ? "cursor-not-allowed" : "" }>
      <div className='flex flex-row border rounded p-2'>
        <div className='w-64 min-w-max'>
          <input
            placeholder="Name"
            type="text" 
            name="name" 
            id="name"
            disabled={uploadStatus}
            value={form.name}
            onChange={onChange}
            className="input w-full input-sm max-w-xs border-gray-300 rounded-md border" />

          <div className='flex'>
            <select 
              id="boxId"
              value={form.boxId}
              onChange={onChange}
              className="select select-sm select-bordered max-w-xs mt-4">
              <option disabled value="">Select Box</option>
              { boxes.map(b => 
                <option key={b.id} value={b.id}>{b.name}</option>
              ) }

            </select>
            <button onClick={create} disabled={uploadStatus || !valid} className="btn btn-sm btn-success ml-2 mt-4">Add</button>
          </div>
        </div>

        { !uploadStatus && 
          <div {...getRootProps()} className="border-dashed border-2 rounded-md p-4 ml-4 cursor-pointer">
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, <br/> or click to select files</p>
            }
          </div>
        }
        { uploadStatus && <div>Drag 'n' drop some files here, or click to select files</div> }

        {previews.length > 0 && (previews.map((p, index) => 
          <img className="h-32 w-32" key={index} src={p} />
        ))}
      </div>
    </form>
  )
}

export default DocumentForm;