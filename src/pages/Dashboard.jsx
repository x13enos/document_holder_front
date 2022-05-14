import React, { useEffect, useState } from 'react';
import httpClient from '../axiosConfig';
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
      <DocumentForm />
      <div className='flex flex-row mt-4'>
        <div className='flex-1'>
          <h1 className='text-2xl'>Last Documents</h1>
          { documents.map((document) => 
              <div className="grid col-span-4 relative mt-2">
              <a className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-2 pr-4 pl-7" href="">
  
                <div className='flex justify-between'>
                  <span className="font-bold text-gray-500 group-hover:text-gray-700">{document.name}</span>
                </div>
  
                <div className="bg-blue-400 group-hover:bg-blue-600 h-full w-4 absolute top-0 left-0"> </div>
              </a>
            </div>
            )
          }
          
        </div>

        <div className='flex-1'>
        </div>
      </div>
    </>
  )
}

export default Dashboard