import React, {useEffect, useState} from "react";
import { useDrop } from "react-dnd";

const TypeFile = ({ typeFile, setCurrentTypeFile, onFileDrop }) => {
  const [countOfType, setCountOfType] = useState(0);

  useEffect(() => {
    countTypes();
  }, []);

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
    const data = await fetch(
      `http://localhost:3000/files/type`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ typeFile }),
      }

    );
    const countType = await data.json();
    setCountOfType(countType);

    console.log(countType)
    // console.log(uplodersName)
  };

  const handleTypeFileClick = () => {
    setCurrentTypeFile(typeFile);
    localStorage.setItem("selectedTypeFile", typeFile);
  };

  return (
    <div ref={drop} style={{ border: isOver ? "2px solid green" : "none" }}>
      <button className="type-file-button" onClick={handleTypeFileClick}>
        {typeFile}  {countOfType}
      </button>
    </div>
  );
};

export default TypeFile;
