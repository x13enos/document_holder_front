import { useState } from "react";
import { BiEditAlt, BiX } from "react-icons/bi";
import BoxForm from  './BoxForm';
import { useOutletContext } from "react-router-dom";
import DeleteModal from "./DeleteModal";

function Box({ box, updateBox, deleteCallback }) {
  const [update, setUpdate] = useState(false);
  const { setModalData } = useOutletContext();

  const showDeleteModal = () => {
    setModalData({ 
      show: true, 
      content: <DeleteModal
        mainText={ `Are you sure you want to delete ${box.name}?` }
        cancelCallback={ () => setModalData({ show: false, content: <></> }) }
        deleteCallback={deleteCallback} />
    })
  };

  return (
    <div className="flex group relative mt-4">
      <div className="group shadow-sm hover:shadow-2xl duration-200 delay-75 w-full bg-white border rounded-sm py-2 pr-4 pl-7">
        { !update &&
          <div className="flex justify-between">
            <div className="flex">
              <div className="w-5 h-5 mt-1 mr-2" style={{ backgroundColor: `#${box.color}` }} />
              { box.name }
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
          <BoxForm box={box} updateBox={updateBox} cancel={() => { setUpdate(false) }} /> 
        }
      </div>
    </div>
    
  )
}

export default Box;