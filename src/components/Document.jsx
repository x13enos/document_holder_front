import { BiEditAlt } from "react-icons/bi";

function Document({ document }) {
  const firstImages = (document) =>
    document.images.filter((i, index) => index <= 0);
  
  const previousSlideId = (index) => 
    `#slide-${document.id}-${index === 0 ? document.images.length - 1 : index - 1}`

  const nextSlideId = (index) => 
    `#slide-${document.id}-${index === document.images.length - 1 ? 0 : index + 1}`

  return (
    <div className="card card-compact bg-base-100 group shadow-lg hover:shadow-2xl duration-200 delay-75 border">
      <div className="card-body">
        <h2 className="card-title">{ document.name }</h2>
        <div className="flex justify-between">
          <p>Added: {document.added}</p> 
          <div className="flex">
            <BiEditAlt
              size="1.5em"
              className='invisible group-hover:visible cursor-pointer' 
              onClick={() => {}}/>
          </div>
        </div>
      </div>
      <figure className="border-t-2 pt-4">
        <div className="carousel w-full max-h-60">
          { document.images.length > 0 && document.images.map((image, index) => 
            <div id={`slide-${document.id}-${index}`} className="carousel-item relative w-full ">
              <img className="mx-auto" src={image.url} alt={image.name} key={image.name} />
              <div class="invisible group-hover:visible absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={previousSlideId(index)} class="btn btn-circle">❮</a> 
                <a href={nextSlideId(index)} class="btn btn-circle">❯</a>
              </div>
            </div>
          ) }
        </div>
      </figure>
    </div>
    // <div className="grid col-span-4 relative mt-2" key={document.id}>
    //   <div className="group shadow-lg hover:shadow-2xl duration-200 delay-75 w-full bg-white rounded-sm py-2 pr-4 pl-7">

    //     <div className='flex justify-between'>
    //       <div>
    //         <span className="font-bold text-gray-500 group-hover:text-gray-700">{document.name}</span>
    //         <div>
    //           <BiEditAlt 
    //             size="1.5em" 
    //             className='hidden group-hover:block cursor-pointer' 
    //             onClick={ () => setUpdate(true) }/>
    //         </div>
    //       </div>
    //       { document.images.length > 0 && firstImages(®document).map(image => 
    //         <img className="w-24 h-24" src={image.url} alt={image.name} key={image.name} />
    //       ) }
    //     </div>

    //     <div className="bg-blue-400 group-hover:bg-blue-600 h-full w-4 absolute top-0 left-0" />
    //   </div>
    // </div>
  )
}

export default Document