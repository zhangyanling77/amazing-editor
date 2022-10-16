import React, { memo, useState } from 'react';
import './style.css';

interface ITooltipProps {
  children: any;
  content?: string;
}
const Tooltip: React.FC<ITooltipProps> = ({ children, content }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="tooltip-container" onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      {children}
      {open && content && <div className="tooltip-content" /*onMouseEnter={handleClose}*/>{content}</div>}
    </div>
  );
};

export default memo(Tooltip);
