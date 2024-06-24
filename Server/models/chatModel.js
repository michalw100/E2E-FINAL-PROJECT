const pool = require("../DB.js");

async function saveChatMessage(userId, message) {
  try {
    const sql = "INSERT INTO chat_messages (user_id, message) VALUES (?, ?)";
    const result = await pool.query(sql, [userId, message]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function getChatMessages() {
  try {
    const sql = "SELECT * FROM chat_messages";
    const result = await pool.query(sql);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  saveChatMessage,
  getChatMessages
};