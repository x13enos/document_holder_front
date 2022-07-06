import React, { useEffect, useState } from 'react';
import httpClient from '../axiosConfig';
import Document from '../components/Document';
import DocumentForm from  '../components/DocumentForm';
import DeleteModal from '../components/DeleteModal';

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [updatingDocument, setUpdatingDocument] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

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

  const updateDocument = (documentData) => {
    const newArray = [...documents];
    const documentIndex = newArray.findIndex((d) => d.id === updatingDocument.id);
    newArray[documentIndex] = documentData;
    setDocuments(newArray);
  }

  return (
    <>
      <DocumentForm
        setUpdatingDocument={setUpdatingDocument}
        document={updatingDocument} 
        boxes={boxes} 
        updateDocument={(documentData) => updateDocument(documentData)}
        addDocument={(documentData) => setDocuments([documentData, ...documents]) } />
      <h1 className='text-2xl mt-4'>
        Last Documents
        { documents.length > 0 && <span>({documents.length})</span> }
      </h1>
      <div className='grid grid-cols-4 gap-4 mt-4'>
        { documents.map((document) => 
        <Document 
          document={document} 
          key={document.id} 
          setDeletingId={setDeletingId} 
          setDocumentAsUpdating={ () => setUpdatingDocument(document) }/>
      )}
      </div>
      <DeleteModal 
        mainText="Are you sure about deleting this document?" 
        deleteCallback={ () => deleteDocument() }/>
    </>
  )
}

export default Dashboard;