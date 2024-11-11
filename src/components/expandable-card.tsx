import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, ReactNode } from "react";

interface ExpandableCardProps {
  title: string;
  content: ReactNode;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h2 className="text-xl font-bold text-primary">{title}</h2>
        <span className="text-muted-foreground">
          {isExpanded ? (
            <FontAwesomeIcon icon={faExpand} />
          ) : (
            <FontAwesomeIcon icon={faCompress} />
          )}
        </span>
      </div>
      {isExpanded && (
        <div className="text-dark-gray mt-4 leading-relaxed">{content}</div>
      )}
    </div>
  );
};

export default ExpandableCard;
