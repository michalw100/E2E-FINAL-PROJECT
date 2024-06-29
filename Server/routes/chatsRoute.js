const express = require("express");
const router = express.Router();
const {
  createChatControllerByFileID,
  createChatControlleryByUserID,
  // getChatByNameController,
  getChatControlleryByUserID,
  getChatControllerByFileID,
} = require("../controllers/chatController");
require("dotenv").config();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/chat", async (req, res) => {
  try {
    const { fileID, userID } = req.body;
    let chat;
    if (fileID) chat = await createChatControllerByFileID(fileID);
    else if (userID) chat = await createChatControlleryByUserID(userID);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/chat", async (req, res) => {
  try {
    const { fileID, userID } = req.query;
    console.log(fileID);
    console.log(userID);
    let chat;
    if (fileID) chat = await getChatControllerByFileID(fileID);
    else if (userID) chat = await getChatControlleryByUserID(userID);
    console.log("chatchatchatchatchatchat");
    console.log(chat);
    if (chat) res.status(200).json(chat);
    else res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// router.get("/chatMembers", async (req, res) => {
//   try {
//     const id = req.query.id;
//     const members = await getManagers(id);
//     res.status(200).send([members]);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// });


router.get("/apiKey", async (req, res) => {
  try {
    const apiKey = process.env.STREAM_API_KEY;
    console.log("apiKey");
    console.log([apiKey]);
    res.status(200).send([apiKey]);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/getChatIDFronSession", (req, res) => {
  // console.log("getClientID");
  if (req.session.chatID) {
    // console.log(req.session.clientID);
    res.status(200).send({ clientID: req.session.chatID });
  } else {
    // console.log("false");
    res.status(404).send({ message: "ChatID not found in session" });
  }
});

router.get("/clearChatIDFronSession", (req, res, next) => {
  // console.log("clearClientID");
  if (req.session.chatID) {
    delete req.session.chatID;
    res.sendStatus(200);
  } else res.sendStatus(404);
});

// router.post("/storeChatIDFronSession", async (req, res, next) => {
//   // console.log("storeClientID");
//   const chatName = req.body.chatName || req.query.chatName;
//   if (chatName) {
//     const chatId = await getChatByNameController(chatName);
//     req.session.chatId = chatId;
//     res.status(200).json({ message: "chatId stored successfully" });
//   } else {
//     // console.log("false");
//     res.status(400).json({ message: "No chatId provided" });
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const chat = await getChatByIdController(req, res);
//     if (chat) {
//       res.status(200).send(chat);
//     } else {
//       res.status(404).send({ error: "Chat not found" });
//     }
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// router.get("/name/:name", async (req, res) => {
//   try {
//     const chat = await getChatByNameController(req, res);
//     if (chat) {
//       res.status(200).send(chat);
//     } else {
//       res.status(404).send({ error: "Chat not found" });
//     }
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

module.exports = router;
