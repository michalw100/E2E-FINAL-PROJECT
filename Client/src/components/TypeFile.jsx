import React from "react";
import { useDrop } from "react-dnd";

const TypeFile = ({ typeFile, setCurrentTypeFile, onFileDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "FILE",
    drop: (item) => {
      onFileDrop(item.id, item.name, item.currentType, typeFile);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleTypeFileClick = () => {
    setCurrentTypeFile(typeFile);
    localStorage.setItem("selectedTypeFile", typeFile);
  };

  return (
    <div ref={drop} style={{ border: isOver ? "2px solid green" : "none" }}>
      <button className="type-file-button" onClick={handleTypeFileClick}>
        {typeFile}
      </button>
    </div>
  );
};

export default TypeFile;
