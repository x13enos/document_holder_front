import React, { useEffect, useState } from 'react';
import httpClient from '../axiosConfig';
import Box from '../components/Box';
import BoxForm from  '../components/BoxForm';

function Boxes() {
  const [boxes, setBoxes] = useState([])

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

  const deleteBox = (box) => {
    const newArray = [...boxes];
    const boxIndex = newArray.findIndex((b) => b.id === box.id);
    newArray.splice(boxIndex, 1);
    setBoxes(newArray);
  }

  return (
    <>
      <div className='border rounded p-2'>
        <BoxForm addBox={(box) => setBoxes([box, ...boxes]) } />
      </div>
      <div className='flex flex-row mt-4'>
        <div className='flex-1'>
          <h1 className='text-2xl'>
            Your Boxes
            { boxes.length > 0 && <span>({boxes.length})</span> }
          </h1>
          { boxes.map((box) => <Box key={box.id} box={box} updateBox={updateBox} deleteCallback={deleteBox} />
          )}
        </div>

        <div className='flex-1'>
        </div>
      </div>
    </>
  )
}

export default Boxes;