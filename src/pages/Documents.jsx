import React, { useEffect, useState } from 'react';
import httpClient from '../axiosConfig';
import Document from '../components/Document';
import DocumentForm from  '../components/DocumentForm';
import DeleteModal from '../components/DeleteModal';

function Dashboard() {
  const [documents, setDocuments] = useState([])
  const [boxes, setBoxes] = useState([])
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await httpClient.get('/documents');
      setDocuments(response.data);
    }
    const fetchBoxes = async () => {
      const response = await httpClient.get('/boxes');
      setBoxes(response.data);
    }

    fetchDocuments();
    fetchBoxes();
  }, []);

  const deleteDocument = async () => {
    await httpClient.delete(`/documents/${deletingId}`);
    const newArray = [...documents];
    const documentIndex = newArray.findIndex((d) => d.id === deletingId);
    newArray.splice(documentIndex, 1);
    setDocuments(newArray);
  };

  return (
    <>
      <DocumentForm boxes={boxes} addDocument={(document) => setDocuments([document, ...documents]) } />
      <h1 className='text-2xl mt-4'>
        Last Documents
        { documents.length > 0 && <span>({documents.length})</span> }
      </h1>
      <div className='grid grid-cols-4 gap-4 mt-4'>
        { documents.map((document) => 
        <Document document={document} key={document.id} setDeletingId={setDeletingId}  />
      )}
      </div>
      <DeleteModal 
        mainText="Are you sure about deleting this document?" 
        deleteCallback={ () => deleteDocument() }/>
    </>
  )
}

export default Dashboard;