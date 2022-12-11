import { useState } from "react";
import { BiEditAlt, BiX } from "react-icons/bi";
import TagForm from './TagForm';
import { useOutletContext } from "react-router-dom";
import DeleteModal from "./DeleteModal";

function Tag({ tag, updateTag, deleteCallback }) {
  const [update, setUpdate] = useState(false);
  const { setModalData } = useOutletContext();

  const showDeleteModal = () => {
    setModalData({ 
      show: true, 
      content: <DeleteModal
        mainText={ `Are you sure you want to delete ${tag.name}?` }
        cancelCallback={ () => setModalData({ show: false, content: <></> }) }
        deleteCallback={deleteCallback} />
    })
  };

  return (
    <div className="flex group relative mt-4">
      <div className="group shadow-sm hover:shadow-2xl duration-200 delay-75 w-full bg-white border rounded-sm py-2 px-4">
        { !update &&
          <div className="flex justify-between">
            <div className="flex">
              { tag.name }
            </div>
            <div className="flex">
              <BiEditAlt 
                size="1.5em" 
                className='hidden group-hover:block cursor-pointer mr-1' 
                onClick={ () => setUpdate(true) }/>
              <label htmlFor="delete-modal" onClick={showDeleteModal}>
                <BiX 
                  size="1.5em" 
                  className='hidden group-hover:block cursor-pointer'/>
              </label>
            </div>
          </div>
        }
        { update && 
          <TagForm tag={tag} updateTag={updateTag} cancel={() => { setUpdate(false) }} /> 
        }
      </div>
    </div>
    
  )
}

export default Tag;