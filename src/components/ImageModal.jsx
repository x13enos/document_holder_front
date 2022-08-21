import { useRef } from "react";
import DetectClickingOutside from "../hooks/DetectClickingOutside";

export default function ImageModal({ image, closeModal }) {
  const wrapperRef = useRef(null);
  DetectClickingOutside(wrapperRef, closeModal);

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div ref={wrapperRef} className="relative w-auto my-6 mx-auto max-w-2xl">
          <label
            onClick={closeModal}
            className="btn btn-sm btn-circle absolute right-2 top-2 z-10">
              ✕
          </label>
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">
            <img 
              className="mx-auto" 
              src={image.url} 
              alt={image.name} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}