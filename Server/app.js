const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const http = require("http");
// const WebSocket = require('ws');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 30 * 60 * 1000 },
    // cookie: { secure: false, httpOnly: true, maxAge: 30 * 1000 },
  })
);

const logger = (req, res, next) => {
  const url = req.url;
  const date = new Date();
  const msg = `Date: ${date}, Url:${url} \n`;
  fs.appendFile(path.join(__dirname, "log.txt"), msg, () => {
    next();
  });
};
app.use(logger);

const extendSession = (req, res, next) => {
  if (req.session.user) {
    req.session.touch();
  }
  next();
};

const checkAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send({ message: "You are not logged in" });
  }
};

const checkClearClientID = (req, res, next) => {
  if (req.session.clientID) {
    delete req.session.clientID;
    res.sendStatus(200);
    res.sendStatus(404);
  }
};

const checkClientID = (req, res, next) => {
  const clientId = req.body.clientID || req.query.clientID;
  if (clientId) {
    req.session.clientID = clientId;
    res.status(200).json({ message: "ClientID stored successfully" });
  } else {
    res.status(400).json({ message: "No ClientID provided" });
  }
};

const emailRoute = require("./routes/emailRoute");
const signInRoute = require("./routes/signInRoute");
const signUpRoute = require("./routes/signUpRoute");
const filesRoute = require("./routes/filesRoute");
const logoutRoute = require("./routes/logoutRoute");
const usersRoute = require("./routes/usersRoute");

app.use("/sendEmail", checkAuth, extendSession, emailRoute);
app.use("/signIn", signInRoute);
app.use("/signUp", signUpRoute);
app.use("/files", checkAuth, extendSession, filesRoute);
app.use("/logout", checkAuth, extendSession, logoutRoute);
app.use("/users", checkAuth, extendSession, usersRoute);
app.use("/clearClientID", checkAuth, extendSession, checkClearClientID);
app.post("/storeClientID", checkAuth, extendSession, checkClientID);
app.get("/getClientID", checkAuth, extendSession, (req, res) => {
  if (req.session.clientID) {
    res.status(200).json({ clientID: req.session.clientID });
  } else {
    res.status(404).json({ message: "ClientID not found in session" });
  }
});
app.post("/refreshSession", checkAuth, extendSession, (req, res) => {
  res.status(200).json({ message: "Session refreshed" });
});

app.use("/checkAuth", (req, res) => {
  res.status(200).json(req.session.user);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const server = http.createServer(app);

// // הגדרת WebSocket server
// const wss = new WebSocket.Server({ server });

// // ניהול חיבורי WebSocket
// wss.on('connection', (ws) => {
//   console.log('New client connected');

//   ws.on('message', (data) => {
//     const { topic, message } = JSON.parse(data);
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify({ topic, message }));
//       }
//     });
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // יצירת שרת HTTP עם Express
// const server = http.createServer(app);

// // הפעלת Socket.IO על השרת
// const io = socketIo(server);

// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('message', (data) => {
//     io.emit('message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
