import React from 'react';

 const ConfirmationModal = ({ isOpen, message, onConfirm, onClose }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-container fixed inset-0 flex justify-center items-center z-9999 bg-gray-500 bg-opacity-50"
      onClick={(e) => {
        if (e.target.className === 'modal-container') onClose();
      }}
    >
      <div
        className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto max-w-lg w-full relative"
        role="dialog"
        aria-labelledby="confirmationModalTitle"
        aria-describedby="confirmationModalDescription"
      >
        {/* Close button */}
        <button
          className="text-xl align-center cursor-pointer absolute top-4 right-4 dark:text-white"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white" id="confirmationModalTitle">
            Confirm Action
          </h3>
        </div>

        <div className="modal-content p-6 text-center">
          <p className="mb-4 text-gray-700 dark:text-white" id="confirmationModalDescription">
            {message}
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-sm hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ConfirmationModal;