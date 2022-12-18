import { BiEditAlt, BiX } from "react-icons/bi";
import ImageModal from './ImageModal';
import DeleteModal from './DeleteModal';
import { useOutletContext } from 'react-router-dom';

function Document({ document, deleteCallback, openForm }) {
  const previousSlideId = (index) => 
    `#slide-${document.id}-${index === 0 ? document.images.length - 1 : index - 1}`
  const nextSlideId = (index) => 
    `#slide-${document.id}-${index === document.images.length - 1 ? 0 : index + 1}`
  const { setModalData } = useOutletContext();
  const showDeleteModal = () => {
    setModalData({ 
      show: true, 
      content: <DeleteModal
        mainText={ `Are you sure you want to delete ${document.name}?` }
        cancelCallback={ () => setModalData({ show: false, content: <></> }) }
        deleteCallback={deleteCallback} />
    })
  };

  return (
    <div className="card card-compact bg-base-100 group shadow-lg hover:shadow-2xl duration-200 delay-75 border">
      <div className="card-body mb-2">
        <h2 className="card-title">{ document.name }</h2>
        { document.tags.length > 0 && (
          <div className="flex">
            {document.tags.map((tag) => (
              <div key={tag.id} className="mr-2 items-center badge">
                {tag.name}
              </div>
            ))}
          </div>
        ) }
        <div className="flex justify-between">
          <p>Added: {document.added}</p> 
          <div className="flex">
            <BiEditAlt
              size="1.5em"
              className='invisible group-hover:visible cursor-pointer' 
              onClick={openForm}/>
            <label htmlFor="delete-modal" onClick={showDeleteModal}>
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
                <img 
                  className="mx-auto cursor-pointer" 
                  src={image.url} 
                  alt={image.name} 
                  key={image.name} 
                  onClick={() => setModalData({
                    show: true,
                    content: <ImageModal 
                      image={image} 
                      closeModal={() => setModalData({ show: false, content: <></>})} />
                  })} />
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