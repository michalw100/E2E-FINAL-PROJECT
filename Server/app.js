const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
require("dotenv").config();

const emailRoute = require("./routes/emailRoute");
const signInRoute = require("./routes/signInRoute");
const signUpRoute = require("./routes/signUpRoute");
const filesRoute = require("./routes/filesRoute");
const logoutRoute = require("./routes/logoutRoute");
const usersRoute = require("./routes/usersRoute");
const myClientRoute = require("./routes/myClientRoute");
const chatRoute = require("./routes/chatRoute"); 
const clientRoute = require("./routes/clientRoute"); 
const employeeRoute = require("./routes/employeeRoute"); 

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
app.use("/chat", chatRoute);
app.use("/clients", clientRoute);
app.use("/employees", employeeRoute);

app.use("/checkAuth", (req, res) => {
  res.status(200).json(req.session.user);
});

cron.schedule("0 */15 * * * *", () => {
  console.log("I've reload myself...");
  if (app && app.get("sessionMiddleware")) {
    app.get("sessionMiddleware")(null, {}, () => {});
  }
});

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