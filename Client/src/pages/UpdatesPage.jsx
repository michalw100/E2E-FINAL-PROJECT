import React, { useEffect, useState, useContext } from "react";
import "../css/update.css";
import { AuthContext } from "../AuthContext";
import { Pie, Bar, Line } from "react-chartjs-2";
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
  const [statusData, setStatusData] = useState([]);
  const [types, setTypes] = useState([]);
  const [chatMessageCounts, setChatMessageCounts] = useState({
    low: 0,
    medium: 0,
    high: 0,
  });
  const [messagesPerDay, setMessagesPerDay] = useState({});
  const [chatStats, setChatStats] = useState([]);
  const [numFilesPerDay, setNumFilesPerDay] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (user && user.id) {
      getStatus();
      fetchFilesPerDay();
      getTypesAndStatus();
    }
  }, [, user]);

  useEffect(() => {
    if (clientReady && chatsInfo) {
      const stats = Object.values(chatsInfo).map((chat) => ({
        chatName: chat.chatName,
        unreadMessages: chat.unreadMessagesCount,
        userMessages: chat.userMessagesCount,
        otherMessages: chat.otherMessagesCount,
      }));
      setChatStats(stats);
      processMessagesPerDay();
      setChatMessageCounts(processChatMessageCounts());
    }
  }, [clientReady, chatClient, chatsInfo]);

  const getTypesAndStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/files/number-files-by-type-and-status?id=${user.id}`,
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
      setTypes(data);
    } catch (error) {
      toasting("error", error);
      console.error("Error fetching types data:", error);
    }
  };

  const processMessagesPerDay = () => {
    const messagesCount = {};
    Object.values(chatsInfo).forEach((chat) => {
      const date = new Date(chat.lastMessageAt).toISOString().split("T")[0];
      if (!messagesCount[date]) {
        messagesCount[date] = 0;
      }
      messagesCount[date] += chat.totalMessagesCount;
    });
    messagesCount["2024-01-01"] = 0;
    setMessagesPerDay(messagesCount);
  };

  const getStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/files/all-status?id=${user.id}`,
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
      setStatusData(data);
    } catch (error) {
      toasting("error", error);
      console.error("Error fetching status data:", error);
    }
  };

  const fetchFilesPerDay = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/files/number-files-uploaded-per-day?id=${user.id}`,
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
      const today = new Date().toISOString().split("T")[0];
      const newYearDate = "2024-01-01";

      const filteredData = data
        .filter((item) => item.count > 0)
        .map((item) => ({
          ...item,
          date: new Date(item.date).toISOString().split("T")[0],
        }));

      // בדיקה אם התאריכים קיימים
      const hasToday = filteredData.some((item) => item.date === today);
      const hasNewYear = filteredData.some((item) => item.date === newYearDate);

      // הוספת התאריכים החסרים
      if (!hasToday) {
        filteredData.push({ date: today, count: 0 });
      }
      if (!hasNewYear) {
        filteredData.push({ date: newYearDate, count: 0 });
      }

      // מיון התאריכים
      filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

      setNumFilesPerDay(filteredData);
    } catch (error) {
      toasting("error", error);
      console.error("Error fetching files per day:", error);
    }
  };

  const statusLabels = statusData.map((status) => status.status);
  const statusCounts = statusData.map((status) => status.count);

  const processChatMessageCounts = () => {
    const categoryCounts = {
      low: 0, // 0-10 הודעות
      medium: 0, // 11-50 הודעות
      high: 0, // 51+ הודעות
    };

    Object.values(chatsInfo).forEach((chat) => {
      const totalMessages = chat.totalMessagesCount;
      if (totalMessages <= 10) {
        categoryCounts.low++;
      } else if (totalMessages <= 50) {
        categoryCounts.medium++;
      } else {
        categoryCounts.high++;
      }
    });

    return categoryCounts;
  };

  const chatCountPieData = {
    labels: [
      "Few Messages (0-10)",
      "Medium Messages (11-50)",
      "Many Messages (51+)",
    ],
    datasets: [
      {
        data: [
          chatMessageCounts.low,
          chatMessageCounts.medium,
          chatMessageCounts.high,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: statusLabels,
    datasets: [
      {
        label: "Status Distribution",
        data: statusCounts,
        backgroundColor: [
          "rgb(200, 200, 200)",
          "#90e290",
          "#d85a5a",
          "rgb(114 164 216)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgb(178 174 174)",
          "#90e290",
          "#d85a5a",
          "rgb(120, 170, 230)",
          "rgba(160, 120, 260, 10)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: numFilesPerDay ? numFilesPerDay.map((item) => item.date) : null,
    datasets: [
      {
        label: "Files Uploaded",
        data: numFilesPerDay.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: false,
        pointRadius: 3,
      },
    ],
  };

  const barData = {
    labels:
      types.length < 0 ? types.map((type, index) => `Type ${index + 1}`) : null,
    datasets: [
      {
        label: "Pending",
        data: types.length < 0 ? types.map((type) => type?.pending || 0) : 0,
        backgroundColor: "rgb(114 164 216)",
        borderColor: "rgb(114 164 216)",
        borderWidth: 1,
      },
      {
        label: "Approved",
        data:
          types.length < 0 ? types.map((type) => type?.approved || 0) : null,
        backgroundColor: "#90e290",
        borderColor: "#90e290",
        borderWidth: 1,
      },
      {
        label: "Rejected",
        data:
          types.length < 0 ? types.map((type) => type?.rejected || 0) : null,
        backgroundColor: "#d85a5a",
        borderColor: "#d85a5a",
        borderWidth: 1,
      },
      {
        label: "Deleted",
        data: types.length < 0 ? types.map((type) => type?.deleted || 0) : null,
        backgroundColor: "rgb(178 174 174)",
        borderColor: "rgb(178 174 174)",
        borderWidth: 1,
      },
    ],
  };

  const shortenChatName = (name, maxLength = 15) => {
    return name.length > maxLength
      ? name.substring(0, maxLength) + "..."
      : name;
  };

  const chatBarData = {
    labels: chatStats
      .slice(0, 10)
      .map((chat) => shortenChatName(chat?.chatName || "")),
    datasets: [
      {
        label: "Unread Messages",
        data: chatStats.slice(0, 10).map((chat) => chat?.unreadMessages || 0),
        backgroundColor: "rgba(255, 206, 86, 1)",
      },
      {
        label: "Messages Sent",
        data: chatStats.slice(0, 10).map((chat) => chat?.userMessages || 0),
        backgroundColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "Messages Received",
        data: chatStats.slice(0, 10).map((chat) => chat?.otherMessages || 0),
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const messageLineData = {
    labels: Object ? Object.keys(messagesPerDay).sort() : null,
    datasets: [
      {
        label: "Messages per Day",
        data: Object.keys(messagesPerDay)
          .sort()
          .map((date) => messagesPerDay[date]),
        backgroundColor: "rgba(255, 99, 132, 1)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: false,
        pointRadius: 0,
      },
    ],
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

  return (
    <div className="all-update">
      {/* <h2 className="title">Updates</h2> */}
      <div className="updates">
        <div className="chart-container">
          <div className="title-div">
            <h3>{t("Chat Messages Overview")}</h3>
          </div>
          <Bar
            className="canvas"
            data={chatBarData}
            options={{
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        </div>
        <div className="chart-container">
          <div className="title-div">
            <h3>{t("Messages Sent per Day")}</h3>
          </div>
          <Line className="canvas" data={messageLineData} options={options} />
        </div>
        <div className="chart-container">
          <div className="title-div">
            <h3>{t("Chat Distribution by Message Count")}</h3>
          </div>
          <Pie
            className="canvas"
            data={chatCountPieData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Chats by Message Volume",
                },
              },
            }}
          />
        </div>
        <div className="chart-container">
          <div className="title-div">
            <h3>{t("File Counts per Type and Status")}</h3>
          </div>
          <Bar
            className="canvas"
            data={barData}
            options={{
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                  beginAtZero: true,
                  max:
                    types.length < 0
                      ? Math.max(...types.map((type) => type.total)) + 1
                      : null,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      let label = context.dataset.label || "";
                      if (label) {
                        label += ": ";
                      }
                      if (context.parsed.y !== null) {
                        label += Math.round(context.parsed.y * 10) / 10;
                      }
                      return label;
                    },
                  },
                },
              },
            }}
          />
          <div className="explanation">
            {types.length < 0 &&
              types.map((type, index) => (
                <div className="types" key={index}>
                  <strong>
                    {t("Type")} {index + 1}:
                  </strong>{" "}
                  {type.type}
                </div>
              ))}
          </div>
        </div>
        <div className="chart-container">
          <div className="title-div">
            <h3>{t("Files Uploaded per Month")}</h3>
          </div>
          <Line className="canvas" data={lineData} options={options} />
        </div>
        <div className="chart-container">
          <div className="title-div">
            <h3>{t("Status")}</h3>
          </div>
          <Pie className="canvas" data={pieData} />
        </div>
      </div>
    </div>
  );
}

export default UpdatesPage;
