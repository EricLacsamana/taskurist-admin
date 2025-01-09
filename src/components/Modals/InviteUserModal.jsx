import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from '@tanstack/react-query';

import { inviteUser } from "../../api/api";
import { addToast } from "../../store/toastSlice";
import UserInvitationForm from "../InviteUserForm";


export const InviteUserModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: inviteUser,
    onSuccess: () => {
      onClose();
      dispatch(addToast({ message: 'Invite Sent!', type: 'success' }));
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
            Invite User
          </h3>
        </div>

        <div className="modal-content overflow-y-auto max-h-[93vh] p-6">
          <UserInvitationForm
            isLoading={isPending}
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  );
};
