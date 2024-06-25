const { createChat, getChatById, getChatByName } = require('../models/chatModel');

async function createChatController(name) {
  const chat = await createChat(name);
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
