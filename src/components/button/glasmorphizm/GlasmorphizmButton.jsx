import React, { useState } from 'react';
import clases from "./GlasmorphizmButton.module.css";

export default function GlasmorphizmButton({
  label = "Button",
  handleAction,
  disabled = false,
  disabledReason = "",
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const handleMouseEnter = () => {
    if (disabled && disabledReason) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div 
      className={`${clases.buttonWrapper}`}
    >
      <div
        className={`${clases.container} ${disabled ? clases.disabled : ''}`}
        onClick={disabled ? undefined : handleAction}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={clases.btn}>
          <span>{label}</span>
        </div>
        {disabled && showTooltip && disabledReason && (
          <div className={clases.tooltip}>
            {disabledReason}
          </div>
        )}
      </div>
    </div>
  );
}