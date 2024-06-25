// const chatModel = require('../models/chatModel');

// async function handleMessage(userId, message) {
//   try {
//     await chatModel.saveChatMessage(userId, message);
//   } catch (err) {
//     console.error("Error saving message to DB", err);
//     throw err;
//   }
// }

// async function getMessages() {
//   try {
//     const messages = await chatModel.getChatMessages();
//     return messages;
//   } catch (err) {
//     console.error("Error retrieving messages from DB", err);
//     throw err;
//   }
// }

// module.exports = {
//   handleMessage,
//   getMessages
// };

// controllers/chatController.js
const { createChat, getChatById, getChatByName } = require('../models/chatModel');

async function createChatController(name) {
  console.log("name");
  console.log(name);
  const chat = await createChat(name);
  console.log("chat")
  console.log(chat.insertId)
  return chat.insertId;
}

async function getChatByIdController(req, res) {
  const { id } = req.params;
  const chat = await getChatById(id);
  return chat;
}

async function getChatByNameController(req, res) {
  const { name } = req.params;
  const chat = await getChatByName(name);
  return chat;
}

module.exports = {
  createChatController,
  getChatByIdController,
  getChatByNameController
};
