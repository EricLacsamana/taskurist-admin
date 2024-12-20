import React, { useState, useEffect, useRef } from 'react';

const MultiSelect = ({ id, options = [], selectedValues = [], onChange }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(selectedValues);
  const dropdownRef = useRef(null);
  const trigger = useRef(null);

  const open = () => setShow(true);

  const close = () => setShow(false);

  const select = (value, event) => {
    if (selected.includes(value)) {
      const newSelected = selected.filter((val) => val !== value);
      setSelected(newSelected);
      onChange(newSelected);
    } else {
      const newSelected = [...selected, value];
      setSelected(newSelected);
      onChange(newSelected);
    }
  };

  const remove = (value) => {
    const newSelected = selected.filter((val) => val !== value);
    setSelected(newSelected);
    onChange(newSelected); 
  };

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
        <div ref={trigger} onClick={open} className="flex items-center border rounded px-4 py-2 cursor-pointer">
          <div className="flex flex-wrap gap-2 w-full">
            {selected.length === 0 && <span className="text-gray-500">Select personnel</span>}
            {selected.map((value) => (
              <div key={value} className="flex items-center bg-gray-200 px-2 py-1 rounded">
                <span>{value}</span>
                <span
                  className="ml-2 cursor-pointer text-red-500"
                  onClick={() => remove(value)}
                >
                  &times;
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="ml-2 p-1"
            onClick={open}
          >
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V4m4 4l-4 4m0 0l-4-4m4 4V4" stroke="#000" strokeWidth="2" />
            </svg>
          </button>
        </div>
        {show && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 w-full mt-2 bg-white shadow-md rounded"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => (
                <div
                  key={option}
                  className={`p-2 cursor-pointer hover:bg-gray-200 ${selected.includes(option) ? 'bg-gray-300' : ''}`}
                  onClick={(e) => select(option, e)}
                >
                  {option}
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
