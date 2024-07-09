import React, { useEffect, useState, useContext } from "react";
import "../css/update.css";
import { AuthContext } from "../AuthContext";
import { Pie, Bar, Line } from "react-chartjs-2";
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
  const { user, chatClient, clientReady, chatsInfo, toasting } =
    useContext(AuthContext);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [pendingChats, setPendingChats] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (user && user.id) {
      fetchPendingFiles();
    }
  }, [, user]);

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
    if (
      user &&
      (user.role === "Role 1" ||
        user.role === "Role 2" ||
        user.role === "Admin")
    ) {
      try {
        const response = await fetch(
          `http://localhost:3000/chats/pending-chats?id=${user.id}&role=${user.role}`,
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
        setPendingChats(data);
      } catch (error) {
        toasting(
          "error",
          "Error fetching pending chats:" + (error.message || error)
        );
      }
    }
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "black",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "black",
        },
      },
    },
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

  return (
    <div className="all-update">
      <div className="updates">
        <MessagesOverview />
        <MessagesPerDay options={options} />
        <MessageCount />
        <FileCounts />
        <FilesUploaded options={options} />
        <FilesStatus />
      </div>
      {/* Add this at the end of your JSX */}
      {user && (user.role == "Role 1" || user.role == "Role 2") && (
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
      )}
      <div className="pending-chats-container">
        <h3>{t("Chats")}</h3>
        <div className="pending-chats-grid">
          {pendingChats &&
            pendingChats.map((chat) => (
              <div key={chat.id} className="pending-chat-item">
                <div className="chat-name">{chat.name}</div>
                <div className="client-name">{chat.clientName}</div>
                <div className="unread-messages">
                  {t("Unread")}: {chat.unreadCount}
                </div>
                <a
                  href={`http://localhost:5173/chat/${chat.id}`}
                  onClick={(e) => handleChatClick(e, chat)}
                  className="chat-link"
                >
                  {t("View Chat")}
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UpdatesPage;
