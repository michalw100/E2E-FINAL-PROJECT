// import "../App.css";
import React, { useContext, useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LuFiles } from "react-icons/lu";
import { ImProfile } from "react-icons/im";
import { FaComments } from "react-icons/fa";
import chanel from "../helpers/chanels.js";
import { AuthContext } from "../AuthContext";
import { MDBBadge } from "mdb-react-ui-kit";
import { Modal, Button } from "react-bootstrap";
import FileCounts from "./FileCounts.jsx";
import FilesStatus from "./FilesStatus.jsx";
import FilesUploaded from "./FilesUploaded.jsx";
import { useTranslation } from "react-i18next";
import chanels from "../helpers/chanels.js";
import "../css/client.css";

const Client = ({ client }) => {
  const { chatClient, chatsInfo } = useContext(AuthContext);
  const [messages, setMessages] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getMessages();
  }, [chatsInfo]);

  const getIDs = async () => {
    try {
      const data = await fetch(
        `http://localhost:3000/files/type?type=${typeFile}&&clientID=${ownerOfFiles}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!data) {
        setCountOfType(0);
      } else {
        const countType = await data.json();
        setCountOfType(countType);
      }
    } catch (error) {
      toasting("error", error.message ? error.message : error);
    }
  };

  const getMessages = async () => {
    try {
      const messages = await chanels.getUnreadMessagesForChat(
        chatsInfo,
        null,
        client.userID
      );
      if (messages == -1) return;
      else setMessages(messages);
    } catch (error) {
      toast.error("Error fetching messages:", error);
    }
  };

  const saveMyClient = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/myClient/storeClientID`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clientID: client.userID }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      toasting(
        "error",
        "Error saving user details:" + error.message ? error.message : error
      );
    }
  };

  const viewDetails = async () => {
    await saveMyClient();
    navigate(`/userDetails/${client.userID}`);
  };

  const viewChat = async () => {
    try {
      await chanel.createChatChannel(
        chatClient,
        null,
        client.userID,
        client.userName
      );
      navigate(`../chats/${client.userID}`);
    } catch (err) {
      console.log(err);
    }
  };

  const viewFiles = async () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const goToFiles = async () => {
    await saveMyClient();
    localStorage.removeItem("selectedTypeFile");
    navigate(`/myFiles/${client.userID}`);
    setShowModal(false);
  };

  return (
    <div key={client.id} className="client">
      <h4 id=".clientDetails">{client.userName}</h4>
      <p className="clientemail">{client.email} </p>
      <button
        className="mydetails btn-primary position-relative mx-3"
        onClick={viewDetails}
      >
        <ImProfile />
      </button>
      <button
        className="mydetails btn-primary position-relative mx-3"
        onClick={viewFiles}
      >
        <LuFiles />
      </button>
      {/* <button className="mydetails" onClick={viewChat}>
        <FaComments />
      </button> */}
      <button
        type="comments"
        onClick={viewChat}
        className="mydetails btn-primary position-relative mx-3"
        // style={{ backgroundColor: '#ac2bac' }}
      >
        <FaComments />
        {/* <i className='fab fa-instagram'></i> */}
        {messages != -1 && (
          <MDBBadge
            pill
            color="danger"
            className="position-absolute top-0 start-100 translate-middle"
          >
            {messages}
            {/*<span className='visually-hidden'>unread messages</span> */}
          </MDBBadge>
        )}
      </button>
      <Modal show={showModal} onHide={handleCloseModal} size="lg" className="file-counts-modal">
        <Modal.Header closeButton>
          <Modal.Title>{t("File Counts for")} {client.userName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FileCounts clientId={client.userID} />
          <FilesUploaded clientId={client.userID} />
          <FilesStatus clientId={client.userID} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t("Close")}
          </Button>
          <Button variant="primary" onClick={goToFiles}>
            {t("View All Files")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Client;
