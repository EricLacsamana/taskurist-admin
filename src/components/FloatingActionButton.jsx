import React from 'react';

const FloatingActionButton = ({  ...props }) => {
  return (
    <button
        { ...props }
        className="fixed bottom-15 right-15 xl:bottom-20 xl:right-25 bg-blue-500 text-white rounded-full p-5 shadow-lg text-3xl flex items-center justify-center w-10 h-10 hover:bg-blue-600 focus:outline-none"
    >
    +
    </button>
  );
};

export default FloatingActionButton;
