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


async function numFilesPerMonth(userID) {
  try {
    const sql = `WITH RECURSIVE months AS (
    SELECT 1 AS month
    UNION ALL
    SELECT month + 1
    FROM months
    WHERE month < 12
)
SELECT 
    m.month, 
    COALESCE(f.count, 0) AS count
FROM 
    months m
LEFT JOIN (
    SELECT 
        MONTH(createdAt) AS month,
        COUNT(*) AS count
    FROM 
        files
    WHERE 
        uploaderID = 4 AND YEAR(createdAt) = YEAR(CURDATE())
    GROUP BY 
        MONTH(createdAt)
) f 
ON 
    m.month = f.month
ORDER BY 
    m.month;
`;
    const result = await pool.query(sql, [userID]);
    return result;
  } catch (err) {
    throw err;
  }
}


async function getStatus(userID) {
  try {
    const sql = `SELECT status, COUNT(*) AS count
FROM files
WHERE uploaderID = ?
GROUP BY status;`;
    const result = await pool.query(sql, [userID]);
    return result;
  } catch (err) {
    throw err;
  }
}
async function numberFilesTypes(userID) {
  try {
    const sql = `
SELECT type, COUNT(*) AS count
FROM files
WHERE uploaderID = ?
GROUP BY type`;
    const result = await pool.query(sql, [userID]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function countTypeFileByClientID(type, userID) {
  const sql = `SELECT COUNT(*) AS count FROM files LEFT JOIN clients ON files.clientID =  clients.id WHERE type = ? AND clients.userID = ?`
  // `SELECT COUNT(*) AS count FROM files WHERE type = ? AND clientID = ?`;
  const files = await pool.query(sql, [type, userID]);
  return files[0];
}

async function countTypeFileByEmployeeID(type, userID) {
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
  const sql = `SELECT files.id, files.driveFileId, files.uploaderID, files.createdAt, files.updatedAt, files.name, files.type, files.status, files.remark, files.clientID, files.topicID FROM employee_client LEFT JOIN clients ON employee_client.clientID = clients.id LEFT JOIN files ON files.clientID = clients.id  WHERE employee_client.employeeID = ? AND files.type = ? `;
  const files = await pool.query(sql, [userID, type]);
  return files[0];
}
async function updateTypeFile(id, type) {
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
  countTypeFileByEmployeeID,
  numFilesPerMonth,
  getStatus,
  numberFilesTypes
};
