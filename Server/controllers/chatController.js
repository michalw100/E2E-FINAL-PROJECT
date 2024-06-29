const {
  createChat,
  getChatById,
  getChatByName,
} = require("../models/chatModel");

async function createChatController(name) {
  const chat = await createChat(name);
  return chat.insertId;
}

// async function getChatByIdController(req, res) {
//   const { id } = req.params;
//   const chat = await getChatById(id);
//   return chat;
// }

async function getChatByNameController(name) {
  const chat = await getChatByName(name);
  if (!chat) {
    const chatID = await createChatController(name);
    return chatID;
  } else return chat.id;
}

module.exports = {
  createChatController,
  // getChatByIdController,
  getChatByNameController,
};
