import React, { useEffect } from "react";
import JobOrderForm from "../../pages/Form/JobOrderForm";

export const JobOrderModal = ({ onClose, isOpen }) => {
  // Early return if the modal is not open
  if (!isOpen) return null;

  // Close the modal when the Escape key is pressed
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Attach the event listener for the Escape key
    document.addEventListener("keydown", handleEscKey);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return (
    <div
      className="modal-container fixed inset-0 flex justify-center items-center z-9999 bg-gray-500 bg-opacity-50"
      onClick={(e) => {
        if (e.target.className === "modal-container") onClose();
      }}
      aria-hidden={!isOpen}
    >
      <div
        className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto max-w-4xl w-full relative"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        {/* Close button with absolute positioning */}
        <button
          className="text-xl align-center cursor-pointer absolute top-4 right-4 dark:text-white"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white" id="modalTitle">
            Job Order Form
          </h3>
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
  