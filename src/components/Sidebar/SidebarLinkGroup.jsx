import React, { useState } from 'react';


const SidebarLinkGroup = ({
  children = null,
  activeCondition = false,
}) => {
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;
