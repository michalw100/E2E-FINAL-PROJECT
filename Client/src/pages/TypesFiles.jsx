import React, { useState, useRef, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TypeFile from "../components/TypeFile";
import { useDrop } from "react-dnd";
import Modal from "react-modal";

Modal.setAppElement("#root");

const TypesFiles = ({ setCurrentTypeFile, currentTypeFile, setFilesChanged, filesChanged, ownerOfFiles}) => {
  const types = [
    "Current material for accounting",
    "Material for an annual report",
    "Approvals, tax coordination and miscellaneous",
    "Reports and information to download",
  ];
  const sidebarRef = useRef(null);
  const [hoveringOverSidebar, setHoveringOverSidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingType, setPendingType] = useState(null);
  const [pendingName, setPendingName] = useState(null);
  const [pendingCurrentType, setPendingCurrentType] = useState(null);

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: "FILE",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleFileDrop = async (fileId, fileName, currentType, newTypeFile) => {
    if (currentType == newTypeFile) return;
    setPendingFile(fileId);
    setPendingType(newTypeFile);
    setPendingName(fileName);
    setPendingCurrentType(currentType);
    setIsModalOpen(true);
  };

  const confirmFileDrop = async () => {
    await fetch(`http://localhost:3000/files`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id: pendingFile, type: pendingType }),
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response;
      })
      .then((data) => {
        setFilesChanged(!filesChanged);
        return;
      });

    setIsModalOpen(false);
    setPendingFile(null);
    setPendingType(null);
  };

  const cancelFileDrop = () => {
    setIsModalOpen(false);
    setPendingFile(null);
    setPendingType(null);
  };

  const handleSidebarMouseEnter = () => {
    setHoveringOverSidebar(true);
  };

  const handleSidebarMouseLeave = () => {
    setHoveringOverSidebar(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (
      event.target === sidebarRef.current ||
      event.target.contains(sidebarRef.current)
    ) {
      handleSidebarMouseEnter();
    }
  };

  const handleDragLeave = () => {
    setHoveringOverSidebar(false);
  };

  useEffect(() => {
    // אם isOver משתנה ל־true, הגרירה מתבצעת
    if (isOver) {
      handleSidebarMouseEnter();
    } else {
      // handleDragLeave();
    }
  }, [isOver]);

  const animateDots = (animate) => {
    const dots = document.querySelectorAll(".openbtn .dot");
    const originalTransforms = [];

    dots.forEach((dot) => {
      originalTransforms.push(dot.style.transform); // שומר את הטרנספורם המקורי של כל נקודה
    });

    if (!animate) {
      dots.forEach((dot, index) => {
        dot.style.transition = "transform 0.3s ease-in-out";
        dot.style.transform = `translateY(-20px) scale(1.2)`;
      });
    } else {
      dots.forEach((dot, index) => {
        setTimeout(() => {
          dot.style.transition = "transform 0.3s ease-in-out";
          dot.style.transform = originalTransforms[index]; // מחזיר את הנקודה למקום המקורי שלה
        }, index * 100); // נותן זמן סט הפעלה שונה לכל נקודה
      });
    }
  };

  useEffect(() => {
    // console.log("WOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
    // console.log(currentTypeFile + "hiii");
    if (currentTypeFile === null) {
      animateDots(true);
    } else {
      animateDots(false);
    }
  }, [, currentTypeFile]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("body--modal-open");
    } else {
      document.body.classList.remove("body--modal-open");
    }
  }, [isModalOpen]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div
          className="openbtn"
          ref={dropRef}
          onMouseEnter={handleSidebarMouseEnter}
          onMouseLeave={handleSidebarMouseLeave}
          style={{
            backgroundColor: isOver && canDrop ? "lightgreen" : "transparent",
          }}
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div
          className={`sidebar ${hoveringOverSidebar ? "open" : ""}`}
          onMouseEnter={handleSidebarMouseEnter}
          onMouseLeave={handleSidebarMouseLeave}
          ref={sidebarRef}
        >
          <h3>Select the file type</h3>

          {types.map((type, index) => (
            <TypeFile
              key={index}
              ownerOfFiles={ownerOfFiles}
              typeFile={type}
              setCurrentTypeFile={setCurrentTypeFile}
              onFileDrop={handleFileDrop}
              onMouseEnter={handleDragOver}
              onMouseLeave={handleDragLeave}
            />
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={cancelFileDrop}
          contentLabel="Confirm File Drop"
          className="modal"
          overlayClassName="overlay"
        >
          <h2>Are you sure?</h2>
          <p>
            Do you really want to move the file <strong>{pendingName}</strong>{" "}
            from <strong>{pendingCurrentType}</strong> to{" "}
            <strong>{pendingType}</strong>?
          </p>
          <button onClick={confirmFileDrop} autoFocus>
            Yes
          </button>
          <button onClick={cancelFileDrop}>No</button>
        </Modal>
      </div>
    </DndProvider>
  );
};

export default TypesFiles;
