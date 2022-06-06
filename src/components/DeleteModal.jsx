import React from 'react';

function DeleteModal({ mainText, deleteCallback }) {
  return (
    <>
    <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{mainText}</h3>
          <div className="modal-action">
            <label htmlFor="delete-modal" className="btn">Cancel</label>
            <label 
              htmlFor="delete-modal" 
              onClick={deleteCallback}
              className="btn btn-error">
                Delete
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteModal;