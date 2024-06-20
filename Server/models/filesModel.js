const pool = require("../DB.js");

async function saveFileToDB(fileId, fileName, type, uploaderID, clientID) {
  const sql = `INSERT INTO files (driveFileId, name, type, uploaderID, clientID, status) VALUES (?, ?, ?, ?, ?, ?)`;
  const newFile = await pool.query(sql, [fileId, fileName, type, uploaderID, clientID, "Absorbed"]);
  return newFile[0];
}

async function getFilesByClientID(clientID, type) {
  const sql = `SELECT * FROM files WHERE clientID = ? AND type = ?`;
  const files = await pool.query(sql, [clientID, type]);
  return files[0];
}

async function countTypeFileByClientID(type, userID) {
  console.log(type)
  const sql = `SELECT COUNT(*) AS count FROM files LEFT JOIN clients ON files.clientID =  clients.id WHERE type = ? AND clients.userID = ?`
  // `SELECT COUNT(*) AS count FROM files WHERE type = ? AND clientID = ?`;
  const files = await pool.query(sql, [type, userID]);
  console.log(files[0])
  return files[0];
}

async function countTypeFileByEmployeeID(type, userID) {
  console.log(type)
  const sql = `SELECT
    e.id AS employeeID,
    COUNT(f.id) AS count
    FROM
    employees emp
JOIN
    users e ON emp.userID = e.id
JOIN
    employee_client ec ON emp.id = ec.employeeID
JOIN
    clients c ON ec.clientID = c.id
LEFT JOIN
    files f ON c.id = f.clientID
WHERE
    e.id = ? AND type = ?
GROUP BY
    e.id`
  const files = await pool.query(sql, [userID, type]);
  console.log("files[0]")
  console.log(files)
  console.log(type + " " +userID)
  return files[0];
}



async function updateRemarkFile(id, remark) {
  const sql = `UPDATE files SET remark = ? WHERE id = ?`;
  const files = await pool.query(sql, [remark, id]);
  return files[0];
}

async function updateStatusFile(id, status) {
  const sql = `UPDATE files SET status = ? WHERE id = ?`;
  const files = await pool.query(sql, [status, id]);
  return files[0];
}

async function getFilesByEmployeeID(userID, type) {
  const sql = `
SELECT files.id, files.driveFileId, files.uploaderID, files.createdAt, files.updatedAt, files.name, files.type, files.status, files.remark, files.clientID, files.topicID FROM employee_client LEFT JOIN clients ON employee_client.clientID = clients.id LEFT JOIN files ON files.clientID = clients.id  WHERE employee_client.employeeID = ? AND files.type = ? `;
  const files = await pool.query(sql, [userID, type]);
  return files[0];
}
async function updateTypeFile(id, type) {
  // console.log("id");
  // console.log(id);
  const sql = `UPDATE files SET type = ? WHERE id = ?`;
  const files = await pool.query(sql, [type, id]);
  return files[0];
}

module.exports = {
  saveFileToDB,
  getFilesByClientID,
  getFilesByEmployeeID,
  updateRemarkFile,
  updateStatusFile,
  updateTypeFile,
  countTypeFileByClientID,
  countTypeFileByEmployeeID
};
