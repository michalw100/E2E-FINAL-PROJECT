const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
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
    saveUninitialized: false, // שיניתי מ-true ל-false
    cookie: { secure: false, httpOnly: true }, // ודא ש-httpOnly מוגדר
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

const emailRoute = require("./routes/emailRoute");
app.use("/sendEmail", emailRoute);

const signInRoute = require("./routes/signInRoute");
app.use("/signIn", signInRoute);

const checkAuth = (req, res, next) => {
  // console.log("req.session.user");
  // console.log(req.session.user);
  if (req.session.user) {
    next();
  } else {
    // console.log("oopsssss")
    res.status(401).send({ message: "You are not logged in" });
  }
};

app.use(checkAuth);

const checkClearClientID = (req, res, next) => {
  if (req.session.clientID) {
    delete req.session.clientID; // מחיקת ה-clientID מה-session
   
    res.sendStatus(200); // שולח סטטוס 200 במקרה של מחיקה מוצלחת
  } else {
    res.sendStatus(404); // או סטטוס 404 אם ה-clientID לא נמצא ב-session
  }
};

app.use("/clearClientID", checkClearClientID);

const checkClientID = (req, res, next) => {
  const clientId = req.body.clientID || req.query.clientID;
  if (clientId) {
    req.session.clientID = clientId;
    res.status(200).json({ message: "ClientID stored successfully" });
  } else {
    res.status(400).json({ message: "No ClientID provided" });
  }
};

app.post("/storeClientID", checkClientID);

app.get("/getClientID", (req, res) => {
  if (req.session.clientID) {
    res.status(200).json({ clientID: req.session.clientID });
  } else {
    res.status(404).json({ message: "ClientID not found in session" });
  }
});

app.use("/checkAuth", (req, res) => {
  res.status(200).json(req.session.user);
});

const signUpRoute = require("./routes/signUpRoute");
app.use("/signUp", signUpRoute);

const filesRoute = require("./routes/filesRoute");
app.use("/files", filesRoute);

const logoutRoute = require("./routes/logoutRoute");
app.use("/logout", logoutRoute);

const usersRoute = require("./routes/usersRoute");
app.use("/users", usersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
