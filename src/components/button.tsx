import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IconButtonProps {
  icon: IconDefinition;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className,
  iconClassName,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-2 rounded shadow-md transition-colors ${className}`}
    >
      <FontAwesomeIcon icon={icon} className={`h-6 w-6 ${iconClassName}`} />
    </button>
  );
};

export default IconButton;
