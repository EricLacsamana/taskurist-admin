import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from '../store/toastSlice';
import { getToastBgColor } from '../utils/toastUtils';

const Toast = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toasts);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (toasts?.length > 0) {
        dispatch(removeToast(toasts[0].id));
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [toasts, dispatch]);

  const handleRemoveToast = (id) => {
    dispatch(removeToast(id));
  };

  return (
    <div className="toast-container fixed bottom-4 right-4 z-50 space-y-4 w-full max-w-xs">
      {toasts?.map((data) => (
        <div
          key={data.id}
          className={`${
            data.visible ? 'animate-enter' : 'animate-leave'
          } max-w-xs w-full ${getToastBgColor(data.type)} shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          {/* Content Section */}
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">{data.title}</p>
                <p className="mt-1 text-sm text-white">{data.message}</p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex items-center justify-center p-2">
            <button
              onClick={() => handleRemoveToast(data.id)}
              type="button"
              className="absolute top-2 right-2 box-content rounded-none border-none opacity-100 hover:no-underline hover:opacity-50 focus:opacity-50 focus:shadow-none focus:outline-none text-white"
              aria-label="Close"
            >
              <span className="w-[1em]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
