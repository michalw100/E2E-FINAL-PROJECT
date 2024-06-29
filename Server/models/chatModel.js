const pool = require("../DB.js");

async function createChat(name) {
  try{
    const result = await pool.query('INSERT INTO chats (name) VALUES (?)', [name]);
    return result[0];
  
  } catch(err){
    throw err;
  }
}

async function createChatControllerByFileID(filedID) {
  try{
    const result = await pool.query('INSERT INTO chats (filedID) VALUES (?)', [filedID]);
    return result[0];
  
  } catch(err){
    throw err;
  }
}

async function createChatControlleryByUserID(userID) {
  try{
    const result = await pool.query('INSERT INTO chats (userID) VALUES (?)', [userID]);
    return result[0];
  
  } catch(err){
    throw err;
  }
}

async function getChatControllerByFileID(filedID) {
  try{
    const result = await pool.query('SELECT * FROM chats WHERE filedID = ?', [filedID]);
    return result[0];
  
  } catch(err){
    throw err;
  }
}

async function getChatControlleryByUserID(userID) {
  try{
    const result = await pool.query('SELECT * FROM chats WHERE userID = ?', [userID]);
    return result[0];
  
  } catch(err){
    throw err;
  }
}


async function getChatById(id) {
  try{

    const [rows] = await pool.query('SELECT * FROM chats WHERE id = ?', [id]);
    return rows[0];
  } catch(err){
    throw err;
  }
}

async function getChatByName(name) {
  try{

    const [rows] = await pool.query('SELECT * FROM chats WHERE name = ?', [name]);
    return rows[0];
  }
  catch(err){
    throw err;
  }
}

module.exports = {
  createChat,
  getChatById,
  getChatByName,
  createChatControllerByFileID,
  createChatControlleryByUserID,
  getChatControllerByFileID,
  getChatControlleryByUserID
};
