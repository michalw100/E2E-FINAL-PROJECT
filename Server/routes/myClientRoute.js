const express = require('express');
const router = express.Router();

app.get("/getClientID", (req, res) => {
  if (req.session.clientID) {
    res.status(200).json({ clientID: req.session.clientID });
  } else {
    res.status(404).json({ message: "ClientID not found in session" });
  }
});

app.get("/clearClientID", (req, res, next) => {
    if (req.session.clientID) {
      delete req.session.clientID;
      res.sendStatus(200);
      res.sendStatus(404);
    }
  });

app.post("/storeClientID", (req, res, next) => {
    const clientId = req.body.clientID || req.query.clientID;
    if (clientId) {
      req.session.clientID = clientId;
      res.status(200).json({ message: "ClientID stored successfully" });
    } else {
      res.status(400).json({ message: "No ClientID provided" });
    }
  });


module.exports = router;