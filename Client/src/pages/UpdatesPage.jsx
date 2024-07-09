import React, { useEffect, useState, useContext } from "react";
import "../css/update.css";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { useTranslation } from "react-i18next";
import MessagesOverview from "../components/MessagesOverview";
import MessagesPerDay from "../components/MessagesPerDay";
import MessageCount from "../components/MessageCount";
import FileCounts from "../components/FileCounts";
import FilesUploaded from "../components/FilesUploaded";
import FilesStatus from "../components/FilesStatus";
import chanels from "../helpers/chanels.js";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement
);

function UpdatesPage() {
  const { user, toasting, chatClient, clientReady, chatsInfo } =
    useContext(AuthContext);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [pendingChats, setPendingChats] = useState([]);
  const [showUpdates, setShowUpdates] = useState(true);
  const [view, setView] = useState("fileUpdates");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (user && user.id) {
      console.log("קראו לי");
      fetchPendingFiles();
      fetchPendingChats();
    }
  }, [, chatClient, clientReady, user]);

  const fetchPendingFiles = async () => {
    if (user && (user.role == "Role 1" || user.role == "Role 2"))
      try {
        const response = await fetch(
          `http://localhost:3000/files/pending-files?id=${user.id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("data");
        console.log(data);
        setPendingFiles(data);
      } catch (error) {
        toasting(
          "error",
          "Error fetching pending files:" + (error.message || error)
        );
      }
  };

  const fetchPendingChats = async () => {
    try {
      // const chatsWithClientNames1 = await Promise.all(
      //   chatsInfo.map(async (chat) => {
      //     const clientResponse = await fetch(
      //       `http://localhost:3000/chats/name?id=${chat.chatId.split("-")[1]}`,
      //       {
      //         method: "GET",
      //         credentials: "include",
      //         headers: {
      //           Accept: "application/json",
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     );
      //     const clientData = await clientResponse.json();
      //     console.log("clientData");
      //     console.log(clientData);
      //     return { ...chat, clientName: clientData.name };
      //   })
      // );
      const chatsWithClientNames = chatsInfo;
      const sortedChats = chatsWithClientNames.sort(
        (a, b) => b.unreadMessagesCount - a.unreadMessagesCount
      );
      setPendingChats(sortedChats);
    } catch (error) {
      toasting("error", "Error fetching chats:" + (error.message || error));
    }
  };

  const saveMyClient = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/myClient/storeClientID`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clientID: id }),
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

  const handleFileClick = async (event, file) => {
    event.preventDefault();
    await saveMyClient(file.clientID);
    localStorage.setItem("selectedTypeFile", file.type);
    navigate(`../myFiles/${file.clientID}`, {
      state: {
        name: file.name,
      },
    });
  };

  const handleChatClick = async (event, chat) => {
    event.preventDefault();
    await chanels.saveCurrentChat(chat.chatId);
    navigate(`../chats/${chat.clientId}`);
  };

  const renderContent = () => {
    switch (view) {
      case "fileUpdates":
        return (
          <div className="updates">
            <FileCounts />
            <FilesUploaded />
            <FilesStatus />
          </div>
        );
      case "chatUpdates":
        return (
          <div className="updates">
            <MessagesOverview />
            <MessagesPerDay />
            <MessageCount />
          </div>
        );
      case "fileTasks":
        return (
          <div className="pending-files-container">
            <h3>{t("Pending Files")}</h3>
            <div className="pending-files-grid">
              {pendingFiles &&
                pendingFiles.map((file) => (
                  <div key={file.id} className="pending-file-item">
                    <div className="file-name">{file.name}</div>
                    <div className="client-name">{file.clientName}</div>
                    <div className={`file-status ${file.status.toLowerCase()}`}>
                      {t(file.status)}
                    </div>
                    <a
                      href={`http://localhost:5173/myFiles/${file.clientID}`}
                      onClick={(e) => handleFileClick(e, file)}
                      className="file-link"
                    >
                      {t("View File")}
                    </a>
                  </div>
                ))}
            </div>
          </div>
        );
      case "chatTasks":
        return (
          <div className="pending-chats-container">
            <h3>{t("Empty Chats")}</h3>
            <div className="pending-chats-grid">
              {pendingChats.map((chat) => (
                <div key={chat.chatId} className="pending-chat-item">
                  <div className="unread-count">
                    {t("Unread Messages")}: {chat.unreadMessagesCount}
                  </div>
                  <a
                    href={`/chats/${chat.chatId}`}
                    onClick={(e) => handleChatClick(e, chat)}
                    className="chat-link"
                  >
                    {t("View Chat")}
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="all-update">
      <div className="toggle-buttons">
        <div
          className={`toggle-highlight ${view}`}
          style={{
            transform: `translateX(${
              view === "fileUpdates"
                ? 293
                : view === "chatUpdates"
                ? 405
                : view === "fileTasks"
                ? 515
                : 628
            }%)`,
          }}
        />
        <button
          className={view === "fileUpdates" ? "active" : ""}
          onClick={() => setView("fileUpdates")}
        >
          {t("File Updates")}
        </button>
        <button
          className={view === "chatUpdates" ? "active" : ""}
          onClick={() => setView("chatUpdates")}
        >
          {t("Chat Updates")}
        </button>
        {user && (user.role == "Role 1" || user.role == "Role 2") && (
          <button
            className={view === "fileTasks" ? "active" : ""}
            onClick={() => setView("fileTasks")}
          >
            {t("File Tasks")}
          </button>
        )}
        <button
          className={view === "chatTasks" ? "active" : ""}
          onClick={() => setView("chatTasks")}
        >
          {t("Chat Tasks")}
        </button>
      </div>
      {renderContent()}
    </div>
  );
}

export default UpdatesPage;
