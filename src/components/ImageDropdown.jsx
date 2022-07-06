import { useState, forwardRef, useImperativeHandle, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageDropdown = forwardRef(({ uploadStatus, document, validateData }, ref) => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  useImperativeHandle(ref, () => ({
    cleanUpPreviews() { setPreviews([]) },
    images
  }));

  useEffect(() => {
    if(document) {
      setImages(document.images);
      setPreviews(document.images);
    }
  }, [document])
  useEffect(() => { validateData() }, [images])
  

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const dataUrl = reader.result;
        setPreviews(oldImages => [...oldImages, { id: null, url: dataUrl }]);
        setImages(oldImages => [...oldImages, { id: null, file }]);
      }
      reader.readAsDataURL(file);
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const removeImage = (event, index) => {
    event.stopPropagation();

    const newImagesArray = [...images];
    const changedImage = newImagesArray.splice(index, 1);    
    if(changedImage[0].id === null) {
      setImages(newImagesArray);
    } else {
      changedImage[0].destroy = true;
      setImages([...newImagesArray, ...changedImage]);
    }

    const newPreviewsArray = [...previews];
    newPreviewsArray.splice(index, 1);
    setPreviews(newPreviewsArray);
  }

  return (
    <>
      { !uploadStatus && 
        <div {...getRootProps()} className="border-dashed border-2 rounded-md py-4 mt-4 cursor-pointer">
          <input {...getInputProps()} />
          <div className='border-b-2 border-dashed px-4 pb-4'>
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, <br/> or click to select files</p>
            }
          </div>
          <div className='grid md:grid-cols-4 grid-cols-1 gap-8 mt-2 p-4'>
            {previews.map((p, index) =>
              <div className="cursor-default mx-full relative border-4 rounded-md">
                <img 
                  className="max-h-64 md:max-h-64 mx-auto"
                  onClick={(event) => { event.stopPropagation() }} 
                  key={index} 
                  src={p.url} />
                <label
                  onClick={ event => removeImage(event, index, p) }
                  className="btn btn-sm btn-circle absolute modal-close-icon z-10">
                    ✕
                </label>
              </div>
            )}
          </div>
        </div>
      }
      { uploadStatus && <div>Drag 'n' drop some files here, or click to select files</div> }
    </>
  )
})

export default ImageDropdown