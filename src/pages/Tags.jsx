import React, { useEffect, useState } from 'react';
import httpClient from '../axiosConfig';
import Tag from '../components/Tag';
import TagForm from  '../components/TagForm';
import { useOutletContext } from 'react-router-dom';

function Tags() {
  const [tags, setTags] = useState([])
  const { setModalData } = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await httpClient.get('/tags');
      setTags(response.data);
    }
    fetchData();
  }, []);

  const updateTag = (tag) => {
    const newArray = [...tags];
    const tagIndex = newArray.findIndex((t) => t.id === tag.id);
    newArray[tagIndex] = tag;
    setTags(newArray);
  }

  const deleteTag = async (tag) => {
    await httpClient.delete(`/tags/${tag.id}`);
    const newArray = [...tags];
    const tagIndex = newArray.findIndex((t) => t.id === tag.id);
    newArray.splice(tagIndex, 1);
    setTags(newArray);
    setModalData({ show: false, content: <></> });
  }

  return (
    <div className='mx-8 mt-4'>
      <div className='border rounded p-2'>
        <TagForm addTag={(tag) => setTags([tag, ...tags]) } />
      </div>
      <div className='flex flex-row mt-4'>
        <div className='flex-1'>
          <h1 className='text-2xl'>
            Your Tags
            { tags.length > 0 && <span>({tags.length})</span> }
          </h1>
          { tags.map((tag) => 
            <Tag 
              key={tag.id} 
              tag={tag} 
              updateTag={updateTag} 
              deleteCallback={() => deleteTag(tag)} />
          )}
        </div>
        <div className='flex-1'></div>
      </div>
    </div>
  )
}

export default Tags;