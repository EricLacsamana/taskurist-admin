import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import JobOrderForm from "../../pages/Form/JobOrderForm";
import { createJobOrder } from "../../api/api";

export const JobOrderModal = ({ onClose, isOpen }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(null);

  const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationFn: createJobOrder, // The function to be called with data
    onSuccess: () => {
      queryClient.invalidateQueries(['jobOrders']);
      onClose();
    },
    onError: (error) => {

      console.error(error);
    },
  });

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  const handleFormSubmit = (formData) => {
    // Trigger the mutation with formData
    mutate(formData);
  };

  // Early return if the modal is not open
  if (!isOpen) return null;

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
        {/* Close button */}
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

        {/* Modal content section */}
        <div className="modal-content overflow-y-auto max-h-[93vh] p-6">
          <JobOrderForm 
            onSubmit={handleFormSubmit} // Passing the submit handler to the form
            isLoading={isPending} // Pass the loading state to the form for disabling the button
            isError={isError} // Pass error state to show error messages in the form
            error={error} // Pass the error message
          />
        </div>
      </div>
    </div>
  );
};
