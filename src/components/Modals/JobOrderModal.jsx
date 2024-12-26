import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import JobOrderForm from "../../pages/Form/JobOrderForm";
import { createJobOrder, retrieveJobOrder, updateJobOrder } from "../../api/api";

export const JobOrderModal = ({ jobOrderId, isOpen, onClose }) => {

  const queryClient = useQueryClient();
    const { data = {} , refetch } = useQuery({
      queryKey: ['job-order'],
      queryFn: ()=> retrieveJobOrder(jobOrderId),
      retry: 3,
      refetchOnWindowFocus: true,
      enabled: !!jobOrderId,
  });

  const jobOrder =  jobOrderId ? data?.data : {};

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: jobOrderId ?  updateJobOrder : createJobOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['job-orders']);
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

    mutate(formData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-container fixed inset-0 flex justify-center items-center z-9999 bg-gray-500 bg-opacity-50"
      onClick={(e) => { 
        if (e.target.className === "modal-container") onClose();
      }}
      // aria-hidden={!isOpen}
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

        <div className="modal-content overflow-y-auto max-h-[93vh] p-6">
          <JobOrderForm
            initialData={jobOrder}
            onSubmit={handleFormSubmit}
            isLoading={isPending}
            isError={isError}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};
