// componente de cartão expansível
// permite ao usuário expandir ou recolher o conteúdo qnd clicar no cabeçalho
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, ReactNode } from "react";

interface ExpandableCardProps {
  title: string;
  content: ReactNode;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ title, content }) => {
  // estado para controlar se o conteúdo tá expandido
  const [isExpanded, setIsExpanded] = useState(false);

  // alterna o estado de expansão qnd clicar
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-md mt-6">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h2 className="text-xl font-bold text-primary">{title}</h2>
        <span className="text-muted-foreground hover:scale-110 transition-transform duration-200 ease-in-out">
          {isExpanded ? (
            <FontAwesomeIcon icon={faExpand} />
          ) : (
            <FontAwesomeIcon icon={faCompress} />
          )}
        </span>
      </div>
      {isExpanded && (
        <div className="text-card-foreground mt-4 leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;
