import { useState, useEffect, useRef } from 'react';
import httpClient from '../axiosConfig';
import ImageDropdown from './ImageDropdown';
import Multiselect from './inputs/Multiselect';

function DocumentForm({ addDocument, updateDocument, showDocuments, document, boxes, tags}) {
  
  const tagsSelectData = tags.reduce((o, tag) => ({ ...o, [tag.id]: tag.name}), {});
  const [valid, setValid] = useState(true)
  const [form, setForm] = useState({ name: '', boxId: '' });
  const [uploadStatus, setUploadStatus] = useState(false);

  const childRef = useRef(null);

  useEffect(() => {
    if (document) {
      setForm({ 
        name: document.name, 
        boxId: document.box.id,
        tagIds: document.tags.map(t => t.id)
      });
    }
  }, [document]);
  useEffect(() => { validateData() }, [form])

  const onChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value})
  }

  const validateData = () => {
    let hasImages
    if (childRef.current)
      hasImages = childRef.current.images.filter(i => !i.destroy).length > 0
    setValid(form.name !== '' && form.boxId !== '' && hasImages)
  }

  const create = async () => {
    setUploadStatus(true);
    const response = await httpClient.post('/documents', gatherData());
    addDocument(response.data);
    cleanUpData();
  }

  const update = async () => {
    setUploadStatus(true);
    const response = await httpClient.put(`/documents/${document.id}`, gatherData());
    updateDocument(response.data);
    cleanUpData();
  }

  const gatherData = () => {
    const images = childRef.current.images;
    let data = new FormData();
    data.append('name', form.name);
    data.append('box_id', form.boxId);
    form.tagIds?.forEach(id => data.append('tag_ids[]', id));
    data.append('deleted_images[]', images.filter(i => i.destroy).map(i => i.id));
    images.filter(i => i.id === null).forEach(i => data.append('images[]', i.file));
    return data;
  }

  const cleanUpData = () => {
    setForm({ name: '', boxId: '' });
    if (childRef.current)
      childRef.current.cleanUpPreviews();
    setUploadStatus(false);
    showDocuments();
  }

  return (
    <div className="relative my-2">
      <div className="relative flex flex-col w-full bg-white outline-none focus:outline-none">
        { uploadStatus ? (
          <div className="spinner-container flex justify-center items-center h-40">
            <div className="loading-spinner" />
          </div> 
        ) : (
          <>
            <form className='md:mt-4'>
              <div className='flex'>
                <label htmlFor="name" className='mt-1 w-16'>Name: </label>
                <input
                  placeholder="Name"
                  type="text" 
                  name="name" 
                  id="name"
                  disabled={uploadStatus}
                  value={form.name}
                  onChange={onChange}
                  className="input w-full input-sm max-w-xs border-gray-300 rounded-md border" />
              </div>
              <div className='flex mt-4'>
                <label htmlFor="boxId" className='mt-1 w-16'>Box: </label>
                <select 
                  id="boxId"
                  value={form.boxId}
                  onChange={onChange}
                  className="select select-sm select-bordered max-w-xs">
                  <option disabled value="">Select Box</option>
                  { boxes.map(b => 
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ) }

                </select>
              </div>
              <div className='flex mt-4'>
                <label htmlFor="tagIds" className='mt-1 w-16'>Tags: </label>
                <Multiselect
                  onChange={(value) => setForm({...form, tagIds: value })}
                  selectedOptions={form.tagIds} 
                  items={tagsSelectData} />
              </div>
              <ImageDropdown 
                ref={childRef}
                document={document}
                validateData={validateData}
                uploadStatus={uploadStatus} />
            </form>
            <div className="h-12 pt-2 pr-4">
              <button onClick={ document ? update : create } disabled={uploadStatus || !valid} className="btn btn-sm btn-success float-right">
                { document ? "Save" : "Add" }
              </button>
              <button onClick={showDocuments} className="btn btn-sm mr-2 float-right">
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DocumentForm;