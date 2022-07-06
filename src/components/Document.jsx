import { BiEditAlt, BiX } from "react-icons/bi";
import ImageModal from './ImageModal';

function Document({ document, setDeletingId, setDocumentAsUpdating }) {
  const previousSlideId = (index) => 
    `#slide-${document.id}-${index === 0 ? document.images.length - 1 : index - 1}`

  const nextSlideId = (index) => 
    `#slide-${document.id}-${index === document.images.length - 1 ? 0 : index + 1}`

  return (
    <div className="card card-compact bg-base-100 group shadow-lg hover:shadow-2xl duration-200 delay-75 border">
      <div className="card-body mb-2">
        <h2 className="card-title">{ document.name }</h2>
        <div className="flex justify-between">
          <p>Added: {document.added}</p> 
          <div className="flex">
            <BiEditAlt
              size="1.5em"
              className='invisible group-hover:visible cursor-pointer' 
              onClick={setDocumentAsUpdating}/>
            <label htmlFor="delete-modal" onClick={() => setDeletingId(document.id)}>
              <BiX
                size="1.5em" 
                className='hidden group-hover:block cursor-pointer'/>
            </label>
          </div>
        </div>
      </div>
      <div className="border-t-2 pt-6 pb-4 relative" style={{ borderColor: '#' + document.box.color }}>
        { document.box && 
          <div className="badge box-badge" style={{ backgroundColor: '#' + document.box.color }}>
            { document.box.name }
          </div> 
        }
        <figure>
          <div className="carousel w-full max-h-60">
            { document.images.length > 0 && document.images.map((image, index) => 
              <div id={`slide-${document.id}-${index}`} key={index} className="carousel-item relative w-full ">
                <ImageModal image={image} />
                { document.images.length > 1 && 
                  <div className="invisible group-hover:visible absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href={previousSlideId(index)} className="btn btn-circle">❮</a> 
                    <a href={nextSlideId(index)} className="btn btn-circle">❯</a>
                  </div> }
              </div>
            ) }
          </div>
        </figure>
      </div>
    </div>
  )
}

export default Document