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


const { createChannel } = require('../models/chatModel');

const createChatChannel = async (req, res) => {
  const { channelId, members } = req.body;
  try {
    const channel = await createChannel(channelId, members);
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createChatChannel };