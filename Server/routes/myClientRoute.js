const express = require("express");
const router = express.Router();

router.get("/getClientID", (req, res) => {
  // console.log("getClientID");
  if (req.session.clientID) {
    // console.log(req.session.clientID);
    res.status(200).send({ clientID: req.session.clientID });
  } else {
    // console.log("false");
    res.status(404).send({ message: "ClientID not found in session" });
  }
});

router.get("/clearClientID", (req, res, next) => {
  // console.log("clearClientID");
  if (req.session.clientID) {
    delete req.session.clientID;
    res.sendStatus(200);
  } else res.sendStatus(404);
});

router.post("/storeClientID", (req, res, next) => {
  // console.log("storeClientID");
  const clientId = req.body.clientID || req.query.clientID;
  if (clientId) {
    // console.log(clientId);
    req.session.clientID = clientId;
    res.status(200).json({ message: "ClientID stored successfully" });
  } else {
    // console.log("false");
    res.status(400).json({ message: "No ClientID provided" });
  }
});

module.exports = router;
