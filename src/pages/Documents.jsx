import React, { useEffect, useState } from 'react';
import httpClient from '../axiosConfig';
import Document from '../components/Document';
import DocumentForm from  '../components/DocumentForm';

function Dashboard() {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await httpClient.get('/documents');
      setDocuments(response.data);
    }

    fetchData();
  }, []);

  return (
    <>
      <DocumentForm addDocument={(document) => setDocuments([...documents, document]) } />
      <div className='flex flex-row mt-4'>
        <div className='flex-1'>
          <h1 className='text-2xl'>
            Last Documents
            { documents.length > 0 && <span>({documents.length})</span> }
          </h1>
          { documents.map((document) => <Document document={document} />)}
        </div>

        <div className='flex-1'>
        </div>
      </div>
    </>
  )
}

export default Dashboard