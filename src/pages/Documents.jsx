import React, { useEffect, useState } from 'react';
import httpClient from '../axiosConfig';
import Document from '../components/Document';
import DocumentForm from  '../components/DocumentForm';

function Dashboard() {
  const [documents, setDocuments] = useState([])
  const [boxes, setBoxes] = useState([])

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

  return (
    <>
      <DocumentForm boxes={boxes} addDocument={(document) => setDocuments([document, ...documents]) } />
      <h1 className='text-2xl mt-4'>
        Last Documents
        { documents.length > 0 && <span>({documents.length})</span> }
      </h1>
      <div className='grid grid-cols-4 gap-4 mt-4'>
        { documents.map((document) => <Document document={document} key={document.id} />)}
      </div>
    </>
  )
}

export default Dashboard;