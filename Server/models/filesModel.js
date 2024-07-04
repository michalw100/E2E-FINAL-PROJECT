const pool = require("../DB.js");

async function saveFileToDB(fileId, fileName, type, uploaderID, clientID) {
  try {
    const sql = `INSERT INTO files (driveFileId, name, type, uploaderID, clientID, status) VALUES (?, ?, ?, ?, ?, ?)`;
    const newFile = await pool.query(sql, [fileId, fileName, type, uploaderID, clientID, "Absorbed"]);
    return newFile[0];

  } catch (err) {
    throw err;
  }
}

async function getFilesByClientID(clientID, type) {
  try {
    const sql = `SELECT * FROM files WHERE clientID = ? AND type = ?`;
    const files = await pool.query(sql, [clientID, type]);
    return files[0];
  } catch (err) {
    throw err;
  }
}

async function getFilesNumber(userID) {
  try{

    const sql = `
  SELECT 
      clientID, 
      COUNT(*) AS fileCount 
  FROM 
      files 
  WHERE 
      clientID = (SELECT id FROM clients WHERE userID = ?)
  GROUP BY 
      clientID;`;
    const files = await pool.query(sql, [userID]);
    return files[0];
  }catch (err) {
    throw err;
  }
}


async function numFilesPerMonthClient(userID) {
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
        clientID = ? AND YEAR(createdAt) = YEAR(CURDATE()) 
      GROUP BY MONTH(createdAt)) f ON m.month = f.month ORDER BY m.month`;
    const result = await pool.query(sql, [userID]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function numFilesPerMonthAdmin() {
  try {
    console.log("ad")

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
      YEAR(createdAt) = YEAR(CURDATE()) 
      GROUP BY MONTH(createdAt)) f ON m.month = f.month ORDER BY m.month`;
    const result = await pool.query(sql);
    console.log(result)
    return result;
  } catch (err) {
    throw err;
  }
}

async function numFilesPerMonthEmployee(userID) {
  try {
    const sql = `WITH RECURSIVE months AS (
    SELECT 1 AS month
    UNION ALL
    SELECT month + 1
    FROM months
    WHERE month < 12
),
client_files AS (
    SELECT
        e.userID AS employee_user_id,
        MONTH(f.createdAt) AS month,
        COUNT(*) AS count
    FROM
        files f
        JOIN clients c ON f.clientID = c.userID
        JOIN employee_client ec ON ec.clientID = c.id
        JOIN employees e ON ec.employeeID = e.id
    WHERE
        YEAR(f.createdAt) = YEAR(CURDATE())
        AND e.userID = ?
    GROUP BY
        e.userID, MONTH(f.createdAt)
)
SELECT 
    m.month,
    COALESCE(cf.count, 0) AS count
FROM 
    months m
    LEFT JOIN client_files cf ON m.month = cf.month
ORDER BY 
    m.month;`;
    const result = await pool.query(sql, [userID]);
    return result;
  } catch (err) {
    throw err;
  }
}


async function getStatusClient(userID) {
  try {
    const sql = `SELECT status, COUNT(*) AS count
FROM files
WHERE clientID = ?
GROUP BY status;`;
    const result = await pool.query(sql, [userID]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function getStatusAdmin() {
  try {
    const sql = `SELECT status, COUNT(*) AS count
FROM files
GROUP BY status;`;
    const result = await pool.query(sql);
    return result;
  } catch (err) {
    throw err;
  }
}

async function getStatusEmployee(userID) {
  try {
    const sql = `SELECT f.status, COUNT(*) AS count
FROM employees e
JOIN employee_client ec ON e.id = ec.employeeID
JOIN clients c ON ec.clientID = c.id
JOIN files f ON c.userID = f.clientID
WHERE e.userID = ?
GROUP BY f.status`;
    const result = await pool.query(sql, [userID]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function numberFilesTypesClient(userID) {
  try {
    const sql = `
SELECT type, COUNT(*) AS count
FROM files
WHERE clientID = ?
GROUP BY type`;
    const result = await pool.query(sql, [userID]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function numberFilesTypesAdmin() {
  try {
    const sql = `
SELECT type, COUNT(*) AS count
FROM files
GROUP BY type`;
    const result = await pool.query(sql);
    return result;
  } catch (err) {
    throw err;
  }
}

async function numberFilesTypesEmployee(userID) {
  try {
    const sql = `SELECT f.type, COUNT(*) AS count
FROM files f
JOIN clients c ON f.clientID = c.id
JOIN employee_client ec ON c.id = ec.clientID
JOIN employees e ON ec.employeeID = e.id
WHERE e.userID = ?
GROUP BY f.type`;
    const result = await pool.query(sql, [userID]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function countTypeFileByClientID(type, userID) {
  const sql = `SELECT COUNT(*) AS count FROM files LEFT JOIN clients ON files.clientID = clients.userID WHERE type = ? AND clients.userID = ?`
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
    files f ON c.userID = f.clientID
WHERE
    e.id = ? AND type = ?
GROUP BY
    e.id`
  const files = await pool.query(sql, [userID, type]);
  return files[0];
}

async function updateRemarkFile(id, remark) {
  try {
    const sql = `UPDATE files SET remark = ? WHERE id = ?`;
    const files = await pool.query(sql, [remark, id]);
    return files[0];
  } catch (err) {
    throw err;
  }
}

async function updateStatusFile(id, status) {
  try {
    const sql = `UPDATE files SET status = ? WHERE id = ?`;
    const files = await pool.query(sql, [status, id]);
    return files[0];
  } catch (err) {
    throw err;
  }

}

async function getFilesByEmployeeID(userID, type) {
  try {
    const sql = `SELECT files.id, files.driveFileId, files.uploaderID, files.createdAt, files.updatedAt, files.name, files.type, files.status, files.remark, files.clientID, files.topicID FROM employee_client LEFT JOIN clients ON employee_client.clientID = clients.id LEFT JOIN files ON files.clientID = clients.userID  WHERE employee_client.employeeID = ? AND files.type = ? `;
    const files = await pool.query(sql, [userID, type]);
    return files[0];
  } catch (err) {
    throw err;
  }
}

async function updateTypeFile(id, type) {
  try {
    const sql = `UPDATE files SET type = ? WHERE id = ?`;
    const files = await pool.query(sql, [type, id]);
    return files[0];
  }
  catch (err) {
    throw err;
  }
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
  numFilesPerMonthClient,
  numFilesPerMonthEmployee,
  // getFilesNumber,
  getStatusAdmin,
  getStatusEmployee,
  getStatusClient,
  numberFilesTypesClient,
  numberFilesTypesEmployee,
  numFilesPerMonthAdmin,
  numberFilesTypesAdmin
};
