const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const http = require("http");
// const cron = require("node-cron"); // יבוא של חבילת node-cron
// const WebSocket = require('ws');
const cron = require("node-cron"); // ייבוא של חבילת node-cron
require("dotenv").config();

const emailRoute = require("./routes/emailRoute");
const signInRoute = require("./routes/signInRoute");
const signUpRoute = require("./routes/signUpRoute");
const filesRoute = require("./routes/filesRoute");
const logoutRoute = require("./routes/logoutRoute");
const usersRoute = require("./routes/usersRoute");
const myClientRoute = require("./routes/myClientRoute");

const logger = require("./Middlewares/logger");
const checkAuth = require("./Middlewares/checkAuth");

const app = express();
const corsOptions = { origin: process.env.CORS_ORIGIN, credentials: true };
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,

    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "Lax",
    },
  })
);

app.use(logger);
app.use("/signIn", signInRoute);
app.use(checkAuth);
app.use("/signUp", signUpRoute);
app.use("/sendEmail", emailRoute);
app.use("/files", filesRoute);
app.use("/logout", logoutRoute);
app.use("/users", usersRoute);
app.use("/myClient", myClientRoute);
app.use("/checkAuth", (req, res) => {
  res.status(200).json(req.session.user);
});

cron.schedule("0 */15 * * * *", () => {
  console.log("I've reload myself...");
  if (app && app.get("sessionMiddleware")) {
    app.get("sessionMiddleware")(null, {}, () => {});
  }
});

// שמירת middleware של הסשן כדי לגשת אליו ב-cron job
app.set(
  "sessionMiddleware",
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "Lax",
    },
  })
);

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
