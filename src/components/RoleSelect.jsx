import React, { useState, useEffect, useRef } from 'react';

const RoleSelect = ({ value, options = [], onChange }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(value); // Track a single selected value
  const dropdownRef = useRef(null);
  const trigger = useRef(null);

  const staticOptions = [
    { value: 'admin', title: 'Admin' },
    { value: 'user', title: 'User' }
  ];


  useEffect(() => {
    setSelected(value);
  }, [value]);

  const open = () => setShow(true);

  const close = () => setShow(false);

  const select = (value) => {
    setSelected(value);
    onChange(value);
    close();
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
        {/* Dropdown trigger */}
        <div
          ref={trigger}
          onClick={open}
          className="flex items-center border rounded px-4 py-2 cursor-pointer"
        >
          <div className="flex w-full">

            {selected === '' && <span className="text-gray-500">Select personnel</span>}

            {selected && staticOptions.find((option) => option.value === selected)?.title}
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
              {staticOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-2 cursor-pointer hover:bg-gray-200 ${selected === option.value
                    ? 'bg-gray-300'
                    : ''}`}
                  onClick={() => select(option.value)}
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

export default RoleSelect;
