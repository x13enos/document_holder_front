import React, { useEffect, useState } from 'react';
import httpClient from '../axiosConfig';
import Box from '../components/Box';
import BoxForm from  '../components/BoxForm';
import DeleteModal from '../components/DeleteModal';

function Boxes() {
  const [boxes, setBoxes] = useState([])
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await httpClient.get('/boxes');
      setBoxes(response.data);
    }
    fetchData();
  }, []);

  const updateBox = (box) => {
    const newArray = [...boxes];
    const boxIndex = newArray.findIndex((b) => b.id === box.id);
    newArray[boxIndex] = box;
    setBoxes(newArray);
  }

  const deleteBox = async (box) => {
    await httpClient.delete(`/boxes/${deletingId}`);
    const newArray = [...boxes];
    const boxIndex = newArray.findIndex((b) => b.id === deletingId);
    newArray.splice(boxIndex, 1);
    setBoxes(newArray);
  }

  return (
    <div className='mx-8 mt-4'>
      <div className='border rounded p-2'>
        <BoxForm addBox={(box) => setBoxes([box, ...boxes]) } />
      </div>
      <div className='flex flex-row mt-4'>
        <div className='flex-1'>
          <h1 className='text-2xl'>
            Your Boxes
            { boxes.length > 0 && <span>({boxes.length})</span> }
          </h1>
          { boxes.map((box) => 
            <Box key={box.id} box={box} updateBox={updateBox} setDeletingId={setDeletingId} />
          )}
        </div>
        <div className='flex-1'></div>
      </div>
      <DeleteModal 
        mainText="Are you sure about deleting this box?" 
        deleteCallback={ () => deleteBox() }/>
    </div>
  )
}

export default Boxes;