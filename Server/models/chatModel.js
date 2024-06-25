// const pool = require("../DB.js");

// async function saveChatMessage(userId, message) {
//   try {
//     const sql = "INSERT INTO chat_messages (user_id, message) VALUES (?, ?)";
//     const result = await pool.query(sql, [userId, message]);
//     return result;
//   } catch (err) {
//     throw err;
//   }
// }

// async function getChatMessages() {
//   try {
//     const sql = "SELECT * FROM chat_messages";
//     const result = await pool.query(sql);
//     return result;
//   } catch (err) {
//     throw err;
//   }
// }

// module.exports = {
//   saveChatMessage,
//   getChatMessages
// };

// models/chat.js
const pool = require("../DB.js");

async function createChat(name) {
  const result = await pool.query('INSERT INTO chats (name) VALUES (?)', [name]);
  console.log("result")
  console.log(result)
  return result[0];
}

async function getChatById(id) {
  const [rows] = await pool.query('SELECT * FROM chats WHERE id = ?', [id]);
  return rows[0];
}

async function getChatByName(name) {
  const [rows] = await pool.query('SELECT * FROM chats WHERE name = ?', [name]);
  return rows[0];
}

module.exports = {
  createChat,
  getChatById,
  getChatByName
};
