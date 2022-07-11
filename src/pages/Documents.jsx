import React, { useEffect, useState } from 'react';
import httpClient from '../axiosConfig';
import Document from '../components/Document';
import DocumentForm from  '../components/DocumentForm';
import DeleteModal from '../components/DeleteModal';
import DocumentFilters from '../components/DocumentFilters';

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [updatingDocument, setUpdatingDocument] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

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

  const deleteDocument = async () => {
    await httpClient.delete(`/documents/${deletingId}`);
    const newArray = [...documents];
    const documentIndex = newArray.findIndex((d) => d.id === deletingId);
    newArray.splice(documentIndex, 1);
    setDocuments(newArray);
  };

  const updateDocument = (documentData) => {
    const newArray = [...documents];
    const documentIndex = newArray.findIndex((d) => d.id === updatingDocument.id);
    newArray[documentIndex] = documentData;
    setDocuments(newArray);
  }

  return (
    <>
      <DocumentFilters boxes={boxes} fetchDocuments={fetchDocuments} />
      <div className="divider"></div>
      <div className='mx-8'>
        <div className='flex items-center'>
          <h1 className='text-2xl mr-4'>
            Documents
            { documents.length > 0 && <span>({documents.length})</span> }
          </h1>
          <DocumentForm
            setUpdatingDocument={setUpdatingDocument}
            document={updatingDocument} 
            boxes={boxes} 
            updateDocument={(documentData) => updateDocument(documentData)}
            addDocument={(documentData) => setDocuments([documentData, ...documents]) } />
        </div>
        <div className='grid grid-cols-4 gap-4 mt-4'>
          { documents.map((document) => 
          <Document 
            document={document} 
            key={document.id} 
            setDeletingId={setDeletingId} 
            setDocumentAsUpdating={ () => setUpdatingDocument(document) }/>
        )}
        </div>
      </div>
      <DeleteModal 
        mainText="Are you sure about deleting this document?" 
        deleteCallback={ () => deleteDocument() }/>
    </>
  )
}

export default Dashboard;