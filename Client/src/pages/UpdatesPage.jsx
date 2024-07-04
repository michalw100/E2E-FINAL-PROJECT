import React, { useEffect, useState, useContext } from "react";
import "../css/update.css";
import { AuthContext } from "../AuthContext";
import { Pie, Radar, Doughnut, Bar, Line } from "react-chartjs-2";
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
import chanels from "../helpers/chanels";

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
  const { user, chatClient, clientReady } = useContext(AuthContext);
  const [numFilesPerMonth, setNumFilesPerMonth] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [types, setTypes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messagesSent, setMessagesSent] = useState([]);
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  // const [totalMessages, setTotalMessages] = useState(0);

  const [numberFiles, setNumberFiles] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      fetchFilesPerMonth();
      getStatus();
      getTypes();
      getNumberFiles();
      getMessages();

    }
    if (clientReady) {
      fetchMessagesData();
    }
  }, [,user]);
  
  // useEffect(() => {
  //   if (clientReady) {
  //     //  getNumberFiles();
  //     fetchMessagesData();
  //   }
  // }, [chatClient]);

  const getMessages = async () => {
    try {
      const messages = await chanels.getChatStats(chatClient, user.id);
      console.log("messages", messages);
      // Calculate the total number of unread messages
      const totalUnreadMessages = messages.reduce(
        (sum, message) => sum + message.unreadMessagesCount,
        0
      );
      console.log("Total unread messages:", totalUnreadMessages);
      setMessages(totalUnreadMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  
  const fetchMessagesData = async () => {
    try {
      const messages = await chanels.getChatStats(chatClient, user.id);
      console.log("Messages:", messages);

      // Extracting relevant data
      const messagesSent = messages.map((message) => message.userMessagesCount);
      const messagesReceived = messages.map(
        (message) => message.otherMessagesCount
      );
      const unreadMessages = messages.map(
        (message) => message.unreadMessagesCount
      );
      // const totalMessages = messages.reduce(
      //   (total, message) => total + message.totalMessagesCount,
      //   0
      // );

      setMessagesSent(messagesSent);
      setMessagesReceived(messagesReceived);
      setUnreadMessages(unreadMessages);
      // setTotalMessages(totalMessages);
    } catch (error) {
      console.error("Error fetching messages data:", error);
    }
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
      console.error("Error fetching status data:", error);
    }
  };

  const getNumberFiles = async () => {
    try {
      const response = await fetch(`http://localhost:3000/files/number-files?id=${user.id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setNumberFiles(data.fileCount);
      console.log("number files")
      console.log(data.fileCount)

    } catch (error) {
      console.error("Error fetching status data:", error);
    }
  };

  const getTypes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/files/number-files-in-type?id=${user.id}`,
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
      console.error("Error fetching types data:", error);
    }
  };

  const fetchFilesPerMonth = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/files/number-files-uploaded-per-month?id=${user.id}`,
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
      // Fill missing months with zero count
      const monthsWithData = data.map((item) => item.month);
      for (let month = 1; month <= 12; month++) {
        if (!monthsWithData.includes(month)) {
          data.push({ month, count: 0 });
        }
      }
      // Sort by month
      data.sort((a, b) => a.month - b.month);
      console.log(data);
      setNumFilesPerMonth(data);
    } catch (error) {
      console.error("Error fetching files per month:", error);
    }
  };

  const statusLabels = statusData.map((status) => status.status);
  const statusCounts = statusData.map((status) => status.count);
  // const doughnutData1 = {
  //   labels: ["Messages Sent", "Messages Received", "Unread Messages"],
  //   datasets: [
  //     {
  //       label: "Messages Overview",
  //       data: [messagesSent, messagesReceived, unreadMessages],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  const doughnutData = {
    labels: ["Messages Sent", "Messages Received", "Unread Messages"],
    datasets: [
      {
        label: "Messages Overview",
        data: [
          messagesSent.reduce((a, b) => a + b, 0),
          messagesReceived.reduce((a, b) => a + b, 0),
          unreadMessages.reduce((a, b) => a + b, 0)
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  
  
  // const radarData = {
  //   labels: ["Messages Sent", "Messages Received", "Unread Messages", "Total Messages"],
  //   datasets: [
  //     {
  //       label: "Messages Overview",
  //       data: [messagesSent, messagesReceived, unreadMessages, totalMessages],
  //       backgroundColor: "rgba(255, 99, 132, 0.2)",
  //       borderColor: "rgba(255, 99, 132, 1)",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const pieData = {
    labels: statusLabels,
    datasets: [
      {
        label: "Status Distribution",
        data: statusCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: numFilesPerMonth.map((item) => `Month ${item.month}`),
    datasets: [
      {
        label: "Files Uploaded",
        data: numFilesPerMonth.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: false,
        pointRadius: 0, // Remove points
      },
    ],
  };

  const barData = {
    labels: types.map((type, index) => `Type ${index + 1}`), // Short labels
    datasets: [
      {
        label: "File Counts per Type",
        data: types.map((type) => type.count),
        backgroundColor: "rgba(150, 120, 80, 0.2)",
        borderColor: "rgba(150, 120, 80, 1)",
        borderWidth: 1,
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
      <h2 className="title">Updates</h2>

      <div className="updates">
        <div className="chart-container">
          <div className="title-div">
            <h3>Files Uploaded per Month</h3>
          </div>
          <Line className="canvas" data={lineData} options={options} />
        </div>
        <div className="chart-container">
          <div className="title-div">
            <h3>Unread Messages</h3>
          </div>
          <p className="p">
            {messages}
            <img
              id="logo"
              className="chats"
              src="../../src/pictures/chat.png"
              alt="chat"
            />
          </p>
        </div>

        <div className="chart-container">
          <div className="title-div">
            <h3>Number Files</h3>
          </div>
          <p className="p">
            {numberFiles}
            <img
              id="logo"
              className="chats"
              src="../../src/pictures/document.png"
              alt="document"
            />
          </p>
        </div>
        <div className="chart-container">
          <div className="title-div">
            <h3>Messages Chat</h3>
          </div>
          {/* <Radar className="canvas" data={radarData} /> */}
          <Doughnut className="canvas" data={doughnutData} />
        </div>
        <div className="chart-container">
          <div className="title-div">
            <h3>File Counts per Type</h3>
          </div>
          <Bar className="canvas" data={barData} options={options} />
          <div className="explanation">
            {types.map((type, index) => (
              <div className="types" key={index}>
                <strong>Type {index + 1}:</strong> {type.type}
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <div className="title-div">
            <h3>Status</h3>
          </div>
          <Pie className="canvas" data={pieData} />
        </div>
      </div>
    </div>
  );
}

export default UpdatesPage;
