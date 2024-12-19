import React from "react";
import JobOrderForm from "../../pages/Form/JobOrderForm";

export const JobOrderModal = ({ closeModal, isOpen }) => {
  // Early return if the modal is not open
  if (!isOpen) return null;

  return (
    <div
      className="modal-container fixed inset-0 flex justify-center items-center z-9999 bg-gray-500 bg-opacity-50"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto max-w-lg w-full relative">
        {/* Close button with absolute positioning */}
        <strong 
          className="text-xl align-center cursor-pointer absolute top-4 right-4 dark:text-white" 
          onClick={closeModal}
        >
          &times;
        </strong>
        
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Job Order Form</h3>
        </div>

        {/* Modal content section with scrollable area */}
        <div className="modal-content overflow-y-auto max-h-[93vh] p-6">
          {/* Job Order Form component */}
          <JobOrderForm />
        </div>
      </div>
    </div>
  );
};
