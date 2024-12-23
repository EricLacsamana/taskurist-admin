import React, { useState, useEffect, useRef } from 'react';

const MultiSelect = ({ id, options = [], selectedValues = [], onChange }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(selectedValues);
  const dropdownRef = useRef(null);
  const trigger = useRef(null);

  // Open the dropdown
  const open = () => setShow(true);

  // Close the dropdown
  const close = () => setShow(false);

  // Handle the selection or removal of an item
  const select = (value, event) => {
    // Prevent click event from propagating when clicking on the remove button
    event.stopPropagation();

    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value) // Deselect if already selected
      : [...selected, value]; // Select the item if not already selected

    setSelected(newSelected);
    onChange(newSelected);
  };

  // Handle item removal
  const remove = (value, event) => {
    event.stopPropagation(); // Prevent closing the dropdown when clicking the remove button
    const newSelected = selected.filter((item) => item !== value);
    setSelected(newSelected);
    onChange(newSelected);
  };

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownRef.current || dropdownRef.current.contains(target) || trigger.current.contains(target)) {
        return;
      }
      close();
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, []);

  return (
    <div className="relative z-50">
      <div className="flex flex-col">
        {/* Dropdown trigger */}
        <div
          ref={trigger}
          onClick={open}
          className="flex items-center border rounded px-4 py-2 cursor-pointer"
        >
          <div className="flex flex-wrap gap-2 w-full">
            {/* If no items are selected, show placeholder text */}
            {selected.length === 0 && <span className="text-gray-500">Select personnel</span>}
            {/* Display selected items */}
            {selected.map((value) => {
              const item = options.find((opt) => opt.value === value);
              return item ? (
                <div key={value} className="flex items-center bg-gray-200 px-2 py-1 rounded">
                  <span>{item.title}</span>
                  <span
                    className="ml-2 cursor-pointer text-red-500"
                    onClick={(e) => remove(value, e)}
                  >
                    &times;
                  </span>
                </div>
              ) : null;
            })}
          </div>
          {/* Dropdown icon */}
          <button type="button" className="ml-2 p-1">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V4m4 4l-4 4m0 0l-4-4m4 4V4" stroke="#000" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Dropdown list */}
        {show && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 w-full mt-2 bg-white shadow-md rounded"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`p-2 cursor-pointer hover:bg-gray-200 ${selected.includes(option.value)
                    ? 'bg-gray-300'
                    : ''}`}
                  onClick={(e) => select(option.value, e)}
                >
                  {option.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
