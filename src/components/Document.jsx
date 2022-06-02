import { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";

function Document({ document }) {
  const [update, setUpdate] = useState(false);
  useEffect(function() {
    
  })

  const firstImages = (document) =>
    document.images.filter((i, index) => index <= 3);

  return (
    <div className="grid col-span-4 relative mt-2" key={document.id}>
      <div className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-2 pr-4 pl-7">

        { !update && 
          <div className='flex justify-between'>
            <div>
              <span className="font-bold text-gray-500 group-hover:text-gray-700">{document.name}</span>
              <div>
                <BiEditAlt 
                  size="1.5em" 
                  className='hidden group-hover:block cursor-pointer' 
                  onClick={ () => setUpdate(true) }/>
              </div>
            </div>
            { document.images.length > 0 && firstImages(document).map(image => 
              <img className="w-24 h-24" src={image.url} alt={image.name} key={image.name} />
            ) }
          </div>
        }

        <div className="bg-blue-400 group-hover:bg-blue-600 h-full w-4 absolute top-0 left-0" />
      </div>
    </div>
  )
}

export default Document