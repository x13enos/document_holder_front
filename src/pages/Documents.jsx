import React, { useEffect, useState } from 'react';
import httpClient from '../axiosConfig';
import Document from '../components/Document';
import DocumentForm from  '../components/DocumentForm';
import DocumentFilters from '../components/DocumentFilters';
import { AiOutlineFileAdd } from 'react-icons/ai';

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [tags, setTags] = useState([]);
  const [documentFormShowing, setDocumentFormShowing] = useState(false);
  const [updatedDocument, setUpdatedDocument] = useState(null);

  const fetchDocuments = async (params = {}) => {
    const response = await httpClient.get('/documents', { params });
    setDocuments(response.data);
  }
  const fetchBoxes = async (filters) => {
    const response = await httpClient.get('/boxes');
    setBoxes(response.data);
  }
  const fetchTags = async (filters) => {
    const response = await httpClient.get('/tags');
    setTags(response.data);
  }

  useEffect(() => {
    fetchDocuments();
    fetchBoxes();
    fetchTags();
  }, []);

  const deleteDocument = async (documentId) => {
    await httpClient.delete(`/documents/${documentId}`);
    const newArray = [...documents];
    const documentIndex = newArray.findIndex((d) => d.id === documentId);
    newArray.splice(documentIndex, 1);
    setDocuments(newArray);
  };

  const updateDocument = (documentId, documentData) => {
    const newArray = [...documents];
    const documentIndex = newArray.findIndex((d) => d.id === documentId);
    newArray[documentIndex] = documentData;
    setDocuments(newArray);
  }

  const showDocuments = () => {
    setUpdatedDocument(null)
    setDocumentFormShowing(false);
  }

  const openUpdatingForm = (document) => {
    setUpdatedDocument(document)
    setDocumentFormShowing(true);
  }

  return (
    <div>
      <div className='flex items-center pl-8 h-20 lg:shadow-md'>
        { documentFormShowing ? (
          <span className='text-2xl mr-4'>{updatedDocument ? "Update document" : "New Document"}</span>
        ) : (
          <>
            <span className='text-2xl mr-4'>Documents</span>
            <button 
              className="btn btn-success btn-circle btn-outline"
              onClick={() => setDocumentFormShowing(true)}>
              <AiOutlineFileAdd size="1.7em" />
            </button>
          </>
        ) }
      </div>
      <div className='mx-8 mb-12'>
        { documentFormShowing ? (
           <DocumentForm
           showDocuments={showDocuments}
           boxes={boxes}
           tags={tags}
           document={updatedDocument}
           updateDocument={(documentData) => updateDocument(document.id, documentData)}
           addDocument={(documentData) => setDocuments([documentData, ...documents]) } />
        ) : (
          <>
            <DocumentFilters boxes={boxes} tags={tags} fetchDocuments={fetchDocuments} />
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4'>
              { documents.map((document) => 
              <Document 
                document={document} 
                key={document.id} 
                deleteCallback={() => deleteDocument(document.id)}
                openForm={() => openUpdatingForm(document)}/>
            )}
        </div>
          </>
        ) }
      </div>
    </div>
  )
}

export default Dashboard;