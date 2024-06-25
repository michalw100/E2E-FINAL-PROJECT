const pool = require("../DB.js");

async function createChat(name) {
  const result = await pool.query('INSERT INTO chats (name) VALUES (?)', [name]);
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
