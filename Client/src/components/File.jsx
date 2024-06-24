import React, { useEffect, useRef, useState, useContext } from "react";
import { FaDownload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useDrag } from "react-dnd";
const File = ({ file, searchCriteria, filesChanged, setFilesChanged }) => {
  const { user } = useContext(AuthContext);
  const [remark, setRemark] = useState(file.remark || "");
  const [showStatus, setShowStatus] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(file.status);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [uplodersName, setUplodersName] = useState(file.remark || "");
  const [ownerName, setOwnerName] = useState(file.remark || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const remarkRef = useRef(null);
  const selectRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FILE",
    item: { id: file.id, currentType: file.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    uploderName();
    const handleClickOutside = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target) &&
        !event.target.classList.contains("file-status")
      ) {
        setShowStatus(false);
        setIsDropdownOpen(false);
      }
      if (remarkRef.current && !remarkRef.current.contains(event.target)) {
        setIsEditing(false);
        changeRemark();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const uploderName = async () => {
    const data1 = await fetch(
      `http://localhost:3000/users/user?id=${file.uploaderID}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const uploader = await data1.json();
    setUplodersName(uploader.name);
    const data2 = await fetch(
      `http://localhost:3000/users/client?id=${file.clientID}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const owner = await data2.json();
    setOwnerName(owner[0].name);
  };

  const downloadFile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/files/download/${file.driveFileId}`,
        {
          responseType: "blob",
          withCredentials: true,
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to download file");
      }
      const blob = new Blob([response.data], { type: "application/pdf" });
      // Create link to file
      const url = window.URL.createObjectURL(blob);
      // Create <a> tag for file download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file.name}`); // Change file name for download
      document.body.appendChild(link);
      // Click link to download file
      link.click();
      // Remove <a> tag from page
      document.body.removeChild(link);
      // Revoke URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error.message);
    }
  };

  const changeStatus = async (newStatus) => {
    await fetch(`http://localhost:3000/files`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ remark: null, status: newStatus, id: file.id }),
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response;
      })
      .then((data) => {
        // console.log(filesChanged)
        setFilesChanged(!filesChanged);
        return;
      });
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("he-IL", options);
  };

  const deleteFile = () => {
    setStatus("Deleted");
    changeStatus("Deleted");
  };

  const nodeleteFile = () => {
    setStatus("Accepted");
    changeStatus("Accepted");
  };

  const commentsFunc = () => {};

  const changeRemark = async () => {
    setIsEditing(!isEditing);
  };

  const changeRemarkInTheDB = async () => {
    await fetch(`http://localhost:3000/files`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ remark: remark, status: null, id: file.id }),
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response;
      })
      .then((data) => {
        // console.log(filesChanged)
        setFilesChanged(!filesChanged);
        // setIsEditing(!isEditing);
      });
  };

  const toggleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (remarkRef.current) {
        remarkRef.current.focus();
      }
    }, 0);
  };

  const employeeChangeStatus = () => {
    if (user.role != "Client") setShowStatus(!showStatus);
  };

  const changeStatusEmployeeAndClient = () => {
    if (user.role != "Client") setShowStatus(!showStatus);
    else if (user.role == "Client" && file.uploaderID != user.id) {
      setShowStatus(!showStatus);
    }
  };

  const highlightSearchTerm = (text, searchTerm) => {
    const lowerText = text.toLowerCase();
    const lowerSearch = searchTerm.toLowerCase();
    const index = lowerText.indexOf(lowerSearch);
    if (index === -1) return text;
    return (
      <>
        {text.substring(0, index)}
        <strong style={{ fontWeight: "bold", backgroundColor: "#ffcc80" }}>
          {text.substring(index, index + searchTerm.length)}
        </strong>
        {text.substring(index + searchTerm.length)}
      </>
    );
  };

  const handleStatusChange = async (e) => {
    setSelectedStatus(e.target.value);
    const newStatus = e.target.value;
    setStatus(newStatus);
    setShowStatus(!showStatus);
    changeStatus(newStatus);
  };

  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };
  const viewFileUrl = `http://localhost:3000/files/view/${file.driveFileId}`;
  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="draggable-file"
    >
      {(file.name.toLowerCase().includes(searchCriteria) ||
        file.updatedAt.toLowerCase().includes(searchCriteria) ||
        uplodersName.toLowerCase().includes(searchCriteria) ||
        ownerName.toLowerCase().includes(searchCriteria) ||
        (file.remark &&
          file.remark.toLowerCase().includes(searchCriteria))) && (
        <div className="file-box">
          <div className="file-info">
            <div className="file-date">
              <strong>
                {highlightSearchTerm(
                  formatDate(file.updatedAt),
                  searchCriteria
                )}
              </strong>
            </div>
            <div className="file-name">
              <a
                href={viewFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="file-name"
              >
                {highlightSearchTerm(file.name, searchCriteria)}
              </a>
            </div>
          </div>

          <div className="box">
            <div className="file-status-container">
              <div className="header">
                <strong>status</strong>
              </div>
              {!showStatus && (
                <div
                  className="file-status"
                  ref={selectRef}
                  style={{
                    background:
                      status === "Absorbed"
                        ? "rgb(114 164 216)"
                        : status === "Accepted"
                        ? "#90e290"
                        : status === "Postponed"
                        ? "#d85a5a"
                        : "rgb(178 174 174)",
                  }}
                  onClick={() => {
                    employeeChangeStatus();
                    changeStatusEmployeeAndClient();
                  }}
                >
                  {status}
                </div>
              )}
              {showStatus && (
                <select
                  ref={selectRef}
                  value={selectedStatus}
                  onKeyDown={handleKeyPress}
                  onChange={handleStatusChange}
                  onBlur={() => setShowStatus(!showStatus)}
                >
                  {user.role == "Client" && file.uploaderID != user.id && (
                    <>
                      <option value={status}>Select status...</option>
                      <option value="Accepted">Accepted</option>
                    </>
                  )}
                  {user.role != "Client" && (
                    <>
                      <option value={status}>Select status...</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Postponed">Postponed</option>
                      <option value="Absorbed">Absorbed</option>
                    </>
                  )}
                </select>
              )}
            </div>
          </div>
          <div className="box">
            <div className="file-comments">
              <div className="header">
                <strong>remark</strong>
              </div>
              {isEditing && (
                <input
                  type="text"
                  ref={remarkRef}
                  value={remark}
                  onChange={handleRemarkChange}
                  onKeyDown={handleKeyPress}
                  onBlur={() => {
                    changeRemarkInTheDB(), changeRemark();
                  }}
                />
              )}
              {
                <div style={{ cursor: "pointer" }}>
                  {status !== "Deleted" && (
                    <button
                      className="update"
                      onClick={() => {
                        // changeRemarkInTheDB(),
                        changeRemark(), toggleEdit();
                      }}
                    >
                      <FaPencil />
                    </button>
                  )}
                  {!isEditing && remark}
                </div>
              }
            </div>
          </div>
          <div className="box">
            <div className="header">
              <strong>uploader</strong>
              <br />
              {highlightSearchTerm(uplodersName, searchCriteria)}
            </div>
          </div>
          <div className="box">
            <div className="header">
              <strong>owner</strong>
              <br />
              {highlightSearchTerm(ownerName, searchCriteria)}
            </div>
          </div>
          <div className="file-actions">
            {status !== "Deleted" && (
              <button className="download" onClick={downloadFile}>
                <FaDownload />
              </button>
            )}
            {status !== "Deleted" ? (
              <button className="delete" onClick={deleteFile}>
                <MdDelete />
              </button>
            ) : (
              <button className="delete" onClick={nodeleteFile}>
                <MdDeleteForever />
              </button>
            )}
            <button className="comments" onClick={commentsFunc}>
              <FaComments />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default File;
