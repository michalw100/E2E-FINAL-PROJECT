const express = require("express");
const router = express.Router();
const {
  createChatController,
  getChatByIdController,
  getChatByNameController,
} = require("../controllers/chatController");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const chat = await createChatController(name);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const chat = await getChatByIdController(req, res);
    if (chat) {
      res.status(200).send(chat);
    } else {
      res.status(404).send({ error: "Chat not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const chat = await getChatByNameController(req, res);
    if (chat) {
      res.status(200).send(chat);
    } else {
      res.status(404).send({ error: "Chat not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
