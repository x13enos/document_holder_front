import { useState, useEffect, useRef } from 'react';
import DetectClickingOutside from "../hooks/DetectClickingOutside";
import httpClient from '../axiosConfig';
import { AiOutlineFileAdd } from "react-icons/ai";
import ImageDropdown from './ImageDropdown';

function Modal({ children, showModal, setShowModal, uploadStatus }) {
  return (
    <>
      {!uploadStatus &&
        <button 
          className="btn btn-success btn-circle btn-outline"
          onClick={ () => setShowModal(true) }>
          <AiOutlineFileAdd size="1.7em" />
        </button>
      }
      {showModal ? (
        <>
          {children}
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

function DocumentForm({ addDocument, updateDocument, setUpdatingDocument, document, boxes }) {
  
  const [valid, setValid] = useState(true)
  const [form, setForm] = useState({ name: '', boxId: '' });
  const [uploadStatus, setUploadStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const wrapperRef = useRef(null);
  const childRef = useRef(null);
  DetectClickingOutside(wrapperRef, () => { cleanUpData() });

  useEffect(() => {
    if (document) {
      setForm({ name: document.name, boxId: document.box.id });
      setShowModal(true);
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
    data.append('deleted_images[]', images.filter(i => i.destroy).map(i => i.id));
    images.filter(i => i.id === null).forEach(i => data.append('images[]', i.file));
    return data;
  }

  const cleanUpData = () => {
    setForm({ name: '', boxId: '' });
    if (childRef.current)
      childRef.current.cleanUpPreviews();
    setShowModal(false);
    setUploadStatus(false);
    setUpdatingDocument(null);
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal} uploadStatus={uploadStatus}>
      <div className="justify-center items-center md:flex overflow-x-hidden overflow-y-auto 
                      fixed inset-0 z-50 outline-none focus:outline-none">
        <div ref={wrapperRef} className="relative w-3/4 my-6 mx-auto">
          <label
            onClick={cleanUpData}
            className="btn btn-sm btn-circle absolute modal-close-icon z-10">
              ✕
          </label>
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            { uploadStatus ? (
              <div className="spinner-container flex justify-center items-center h-40">
                <div className="loading-spinner" />
              </div> 
            ) : (
              <>
                <div className="bg-slate-200 min-w-max h-12 pt-2 pl-4">
                  <div className='text-2xl'>{ document ? "Update Document" : "Create New Document" }</div>
                </div>
                <form className={ uploadStatus ? "px-2 cursor-not-allowed" : "px-2 py-2" }>
                  <div className="p-2">
                    <div className='flex'>
                      <label htmlFor="name" className='mt-1 mr-2'>Name: </label>
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
                      <label htmlFor="boxId" className='mt-1 mr-2'>Box: </label>
                      <select 
                        id="boxId"
                        value={form.boxId}
                        onChange={onChange}
                        className="select select-sm select-bordered max-w-xs ml-4">
                        <option disabled value="">Select Box</option>
                        { boxes.map(b => 
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ) }

                      </select>
                    </div>
                    <ImageDropdown 
                      ref={childRef}
                      document={document}
                      validateData={validateData}
                      uploadStatus={uploadStatus} />
                  </div>
                </form>
                <div className="bg-slate-200 min-w-max h-12 pt-2 pr-4">
                  <button onClick={ document ? update : create } disabled={uploadStatus || !valid} className="btn btn-sm btn-success float-right">
                    { document ? "Save" : "Add" }
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </Modal>
  )
}

export default DocumentForm;