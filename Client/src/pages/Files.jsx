import React, { useCallback, useEffect, useState, useContext } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "../AuthContext";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import File from "../components/File";
import { FaSearch } from "react-icons/fa";
import { TbDragDrop } from "react-icons/tb";
import { FaSort } from "react-icons/fa6";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TypesFiles from "./TypesFiles.jsx";
import { FaRegHandPointRight } from "react-icons/fa6";

function Files() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [currentTypeFile, setCurrentTypeFile] = useState(null);
  const [ownerOfFiles, setOwnerOfFiles] = useState(null);
  const [files, setFiles] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [serverFiles, setServerFiles] = useState([]);
  const [filesChanged, setFilesChanged] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [sortCriteria, setSortCriteria] = useState("dating");
  const [filteredFiles, setFilteredFiles] = useState();
  const [currentPage, setCurrentPage] = useState(1); // State for current page of displayed files
  const [currentClient, setCurrentClient] = useState("?"); // State for number of files per page

  // const response = fetch("http://localhost:3000/files/deleteAllFiles", {
  //   method: "DELETE",
  //   credentials: "include",
  // });

  useEffect(() => {
    switch (sortCriteria) {
      case "dating":
        const sortedFiles = [...serverFiles].sort((fileA, fileB) => {
          const dateA = new Date(fileA.updatedAt);
          const dateB = new Date(fileB.updatedAt);
          return dateB - dateA;
        });
        setFilteredFiles(sortedFiles);
        break;
      case "Accepted":
        const acceptedFiles = serverFiles.filter(
          (file) => file.status === "Accepted"
        );
        setFilteredFiles(acceptedFiles);
        break;

      case "Postponed":
        const postponedFiles = serverFiles.filter(
          (file) => file.status === "Postponed"
        );
        setFilteredFiles(postponedFiles);
        break;

      case "Absorbed":
        const absorbedFiles = serverFiles.filter(
          (file) => file.status === "Absorbed"
        );
        setFilteredFiles(absorbedFiles);
        break;
      case "Deleted":
        const deletedFiles = serverFiles.filter(
          (file) => file.status === "Deleted"
        );
        setFilteredFiles(deletedFiles);
        break;

      case "alphabetical":
        setFilteredFiles(
          [...serverFiles].sort((a, b) => a.name.localeCompare(b.title))
        );
        break;
      case "random":
        setFilteredFiles([...serverFiles].sort(() => Math.random() - 0.5));
        break;
      default:
        setFilteredFiles(serverFiles);
        break;
    }
  }, [sortCriteria, serverFiles]);

  useEffect(() => {
    if (user && user.id !== undefined) {
      if (user.role === "Client") {
        setShowDrop(true);
        setOwnerOfFiles(user.id);
        setCurrentClient(user.name)
      } else {
        fetch("http://localhost:3000/getClientID", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.clientID) {
              setOwnerOfFiles(data.clientID);
              setCurrentClient(user.name)
              console.log(user.name)
              setShowDrop(true);
            } else setOwnerOfFiles(user.id);
          })
          .catch((error) => {
            setOwnerOfFiles(user.id);
          });
      }
    }
  }, [user, location]);

  useEffect(() => {
    const savedTypeFile = localStorage.getItem("selectedTypeFile");
    if (savedTypeFile && !currentTypeFile) {
      setCurrentTypeFile(savedTypeFile);
    }
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const onDropRejected = useCallback((rejectedFiles) => {
    setRejectedFiles(rejectedFiles);
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("uploaderID", user.id);
    formData.append("clientID", ownerOfFiles);
    formData.append("typeFile", currentTypeFile);
    formData.append("filesNames", files.map((file) => file.name).join(",")); // שליחת שמות הקבצים כמחרוזת מופרדת בפסיקים
    setUploadStatus("uploading files...");
    axios
      .post("http://localhost:3000/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        if (response.statusText == "OK") {
          setUploadStatus("Files uploaded successfully");
          setFiles([]);
          loadFiles();
        }
      })
      .catch((error) => {
        setUploadStatus(error.response.data);
      });
  };

  useEffect(() => {
    if (ownerOfFiles && user.id != undefined && currentTypeFile) {
      loadFiles();
    }
  }, [ownerOfFiles, filesChanged, currentTypeFile]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "application/pdf": [],
    },
    multiple: true,
  });

  const loadFiles = async () => {
    axios
      .get(`http://localhost:3000/files`, {
        params: {
          userID: ownerOfFiles,
          typeFile: currentTypeFile,
        },
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setServerFiles(response.data);
        if (response.data.length == 0) {
          setUploadStatus("This client has no files");
        }
      })
      .catch((error) => {
        setUploadStatus(error.response.data.message);
      });
  };
  // קבל את הקבצים הנוכחיים להצגה על פי העמוד הנוכחי
  const getCurrentFiles = () => {
    if (filteredFiles) {
      const endIndex = currentPage * 15;
      return filteredFiles.slice(0, endIndex);
    }
    return [];
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="page_files">
        <TypesFiles
          setCurrentTypeFile={setCurrentTypeFile}
          currentTypeFile={currentTypeFile}
          filesChanged={filesChanged}
          setFilesChanged={setFilesChanged}
          ownerOfFiles={ownerOfFiles}
        />
        {currentTypeFile ? (
          <div>
            {showDrop && (
              <div>
                <div className="draganddrop" {...getRootProps()}>
                  <input {...getInputProps()} multiple />
                  <p>
                    <TbDragDrop /> Drag 'n' drop PDF files here, or click to
                    select files
                  </p>
                </div>
                {files.length > 0 && (
                  <div>
                    <div className="files-container">
                      <h4>Files to be uploaded:</h4>
                      <ul>
                        {files.map((file, index) => (
                          <div key={index} className="file-box">
                            <span className="file-name">
                              {file.path || file.name}
                            </span>
                          </div>
                        ))}
                      </ul>
                    </div>
                    {uploadStatus != "uploading files..." ? (
                      <button className="upload-btn" onClick={handleUpload}>
                        Upload
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
                {rejectedFiles.length > 0 && (
                  <div>
                    <h4>Rejected files:</h4>
                    <ul>
                      {rejectedFiles.map(({ file, errors }, index) => (
                        <li key={index}>
                          {file.path || file.name} -{" "}
                          {errors.map((e) => e.message).join(", ")}
                        </li>
                      ))}
                    </ul>
                    <p>Only PDF files are allowed.</p>
                  </div>
                )}
              </div>
            )}
                        {uploadStatus && <p>{uploadStatus}</p>}
                        <div className="filesTitle">
                        <h5 className="yourFiles">{currentClient}'s files:</h5>

            <div className="search-bar">
              <FaSearch />
              {/* <label className="input">Search:</label> */}
              <input
                type="text"
                value={searchCriteria}
                placeholder="Search"
                onChange={(event) => setSearchCriteria(event.target.value)}
              />
            </div>
              </div>
            <div className="search-bar">
              {/* <LiaSortSolid /> */}
              <FaSort />

              {/* <label className="input">Sort by:</label> */}
              <select
                className="inputItem select"
                id="sortSelect"
                value={sortCriteria}
                onChange={(event) => {
                  setSortCriteria(event.target.value);
                }}
              >
                <option value="dating">dating</option>
                <option value="Absorbed">Absorbed</option>
                <option value="Postponed">Postponed</option>
                <option value="Accepted">Accepted</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="random">random</option>
              </select>
            </div>
            <div className="files">
              {getCurrentFiles().map((file, index) => (
                <File
                  key={file.id}
                  file={file}
                  searchCriteria={searchCriteria}
                  filesChanged={filesChanged}
                  setFilesChanged={setFilesChanged}
                />
              ))}
            </div>
            {filteredFiles.length > currentPage * 15 ? (
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More Files ({filteredFiles.length - currentPage * 15}{" "}
                remaining)
              </button>
            ) : (
              <p>There are no more files to load.</p>
            )}{" "}
          </div>
        ) : (
          <div className="hand">
            turn in the 3 points on the side
            <br />
            <FaRegHandPointRight />
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default Files;
