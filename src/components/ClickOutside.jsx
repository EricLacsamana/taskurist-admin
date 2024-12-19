import React, { useRef, useEffect } from 'react';

const ClickOutside = ({
  children = null,
  exceptionRef = undefined,
  onClick = () => {},
  className = '',
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickListener = (event) => {
      const clickedInside =
        wrapperRef.current?.contains(event.target) ||
        exceptionRef?.current?.contains(event.target) ||
        exceptionRef?.current === event.target;

      if (!clickedInside) onClick();
    };

    document.addEventListener('mousedown', handleClickListener);

    return () => {
      document.removeEventListener('mousedown', handleClickListener);
    };
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export default ClickOutside;
