import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";

const TypeFile = ({
  typeFile,
  setCurrentTypeFile,
  onFileDrop,
  ownerOfFiles,
}) => {
  const [countOfType, setCountOfType] = useState(0);
  console.log("ownerOfFiles    " + ownerOfFiles);

  useEffect(() => {
    if (ownerOfFiles != null) {
    countTypes();
    }
  }, [ownerOfFiles]);

  const [{ isOver }, drop] = useDrop({
    accept: "FILE",
    drop: (item) => {
      onFileDrop(item.id, item.name, item.currentType, typeFile);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const countTypes = async () => {
    try {
      const data = await fetch(
        `http://localhost:3000/files/type?type=${typeFile}&&clientID=${ownerOfFiles}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const countType = await data.json();
      setCountOfType(countType);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTypeFileClick = () => {
    setCurrentTypeFile(typeFile);
    localStorage.setItem("selectedTypeFile", typeFile);
  };

  return (
    <div ref={drop} style={{ border: isOver ? "2px solid green" : "none" }}>
      <button className="type-file-button" onClick={handleTypeFileClick}>
        <strong>{typeFile}</strong>
      </button>
      {countOfType.count} files
      <hr></hr>
    </div>
  );
};

export default TypeFile;
