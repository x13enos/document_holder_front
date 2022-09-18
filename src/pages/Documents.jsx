import React, { useEffect, useState } from 'react';
import httpClient from '../axiosConfig';
import Document from '../components/Document';
import DocumentForm from  '../components/DocumentForm';
import DocumentFilters from '../components/DocumentFilters';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { useOutletContext } from 'react-router-dom';

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const { setModalData } = useOutletContext();

  const fetchDocuments = async (params = {}) => {
    const response = await httpClient.get('/documents', { params });
    setDocuments(response.data);
  }

  useEffect(() => {
    const fetchBoxes = async (filters) => {
      const response = await httpClient.get('/boxes');
      setBoxes(response.data);
    }

    fetchDocuments();
    fetchBoxes();
  }, []);

  const deleteDocument = async (documentId) => {
    await httpClient.delete(`/documents/${documentId}`);
    const newArray = [...documents];
    const documentIndex = newArray.findIndex((d) => d.id === documentId);
    newArray.splice(documentIndex, 1);
    setDocuments(newArray);
  };

  const updateDocument = (document, documentData) => {
    const newArray = [...documents];
    const documentIndex = newArray.findIndex((d) => d.id === document.id);
    newArray[documentIndex] = documentData;
    setDocuments(newArray);
  }

  const closeModal = () => {
    setModalData({ show: false, content: <></> });
  }

  const openForm = (document = null) => {
    setModalData({ show: true, content:
      <DocumentForm
        closeModal={closeModal}
        boxes={boxes}
        document={document}
        updateDocument={(documentData) => updateDocument(documentData)}
        addDocument={(documentData) => setDocuments([documentData, ...documents]) } />
    })
  }

  return (
    <div>
      <div className='flex items-center pl-8 h-20 lg:shadow-md'>
        <span className='text-2xl mr-4'>Documents</span>
        <button 
          className="btn btn-success btn-circle btn-outline"
          onClick={() => openForm(null)}>
          <AiOutlineFileAdd size="1.7em" />
        </button>
      </div>
      <div className='mx-8'>
        <DocumentFilters boxes={boxes} fetchDocuments={fetchDocuments} />
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4'>
          { documents.map((document) => 
          <Document 
            document={document} 
            key={document.id} 
            deleteCallback={() => deleteDocument(document.id)}
            openForm={() => openForm(document)}/>
        )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;