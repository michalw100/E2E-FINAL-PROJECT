const pool = require("../DB.js");

async function getEmployees() {
  try {
    const sql =
      `SELECT * from employees LEFT JOIN users ON employees.userID = users.id where role!="Admin"`;
    const result = await pool.query(sql);
    return result;
  } catch (err) {
    throw err;
  }
}

async function getClients() {
  try {
    const sql =
      "SELECT users.id, users.userName, users.name, users.email, users.phone, users.addressID, clients.id AS client_id, clients.userID, clients.parentClientID, clients.isApproved, clients.notes from clients LEFT JOIN users ON clients.userID = users.id";
    const result = await pool.query(sql);
    return result;
  } catch (err) {
    throw err;
  }
}

async function getClientsEmployee(id) {
  try {
    const sql =
"SELECT users.id, users.userName, users.name, users.email, users.phone, users.addressID, clients.id AS client_id, clients.userID, clients.parentClientID, clients.isApproved, clients.notes FROM clients Left JOIN users ON users.id = clients.userID Left JOIN employee_client ON employee_client.clientID = clients.id LEFT JOIN employees ON employee_client.employeeID = employees.id WHERE employees.id = ?"
    const result = await pool.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function getConnections() {
  try {
    const sql =
      "SELECT clients.id AS client_id, employees.id AS employee_id, client_users.id AS client_user_id,employees.userID AS employee_user_id FROM employees JOIN users ON employees.userID = users.id JOIN employee_client ON employee_client.employeeID = employees.id JOIN clients ON employee_client.clientID = clients.id JOIN users AS client_users ON clients.userID = client_users.id";
    const result = await pool.query(sql);
    return result;
  } catch (err) {
    throw err;
  }
}



async function employeeToClient(employeeID, clientID) {
  try {
    const sql = "INSERT INTO employee_client (employeeID, clientID) VALUES (?, ?)";
    const result = await pool.query(sql, [employeeID, clientID]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function deleteConnection(id) {
  try {
    const sql = "DELETE FROM employee_client WHERE id = ?";
    const result = await pool.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
}


async function updateConnection(employeeID, clientID, id) {
  try {
    const sql = "UPDATE employee_client SET employeeID = ?, clientID = ? WHERE id = ?";
    const result = await pool.query(sql, [employeeID, clientID, id]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function getUser(id) {
  try {
    const sql =
      "SELECT phone, email, name, userName, users.id, street, zipcode, city, users.addressID, role FROM users LEFT JOIN addresses ON users.addressID = addresses.addressID LEFT JOIN employees ON users.id = employees.userID WHERE users.id = ?";
    const result = await pool.query(sql, [id]);
    return result[0];
  } catch (err) {
    throw err;
  }
}

async function getUserByPasswordAndUserName(userName) {
  try {
    const sql =
      "SELECT password, phone, email, name, userName, users.id, street, zipcode, city, role FROM users NATURAL JOIN passwords LEFT JOIN addresses ON users.addressID = addresses.addressID LEFT JOIN employees ON users.id = employees.userID WHERE userName=?";
    const result = await pool.query(sql, userName);
    const user = result[0];

    return user;
  } catch (err) {
    throw err;
  }
}

async function getClientIDOrEmployeeIDByUserID(userID) {
  try {
    const sql =
      "SELECT clients.id AS client_id, employees.id AS employee_id FROM users LEFT JOIN clients ON users.id = clients.userID LEFT JOIN employees ON users.id = employees.userID WHERE users.id = ?";
    const result = await pool.query(sql, userID);
    const id = result[0];
    return id;
  } catch (err) {
    throw err;
  }
}

async function createUser(userName, hashedPassword, employeType, role) {
  try {
    const sql = "INSERT INTO users (`userName`) VALUES(?)";
    const newUser = await pool.query(sql, [userName]);
    const sqlPassword = "INSERT INTO passwords (id, password) VALUES(?,?)";
    const newPassword = await pool.query(sqlPassword, [
      newUser[0].insertId,
      hashedPassword,
    ]);
    switch (role) {
      case "Admin":
        {
          const sql =
            "INSERT INTO cbs_db.employees (`userID`, `role`) VALUES(?, ?)";
          const newEmployee = await pool.query(sql, [
            newUser[0].insertId,
            "Admin",
          ]);
        }
        break;
      case "Employee":
        {
          const sql =
            "INSERT INTO cbs_db.employees (`userID`, `role`) VALUES(?, ?)";
          const newEmployee = await pool.query(sql, [
            newUser[0].insertId,
            employeType,
          ]);
        }
        break;
      case "Client":
        {
          const sql = "INSERT INTO cbs_db.clients (`userID`) VALUES(?)";
          const newClient = await pool.query(sql, [newUser[0].insertId]);
        }
        break;
      default:
        break;
    }
    return newUser[0];
  } catch (err) {
    throw err;
  }
}
const updateUser = async (
  id,
  userName,
  name,
  email,
  phone,
  street,
  city,
  zipcode
) => {
  const user = await getUser(id);
  let address = user[0].addressID;
  // console.log(address)
  let resultAddress;
  // console.log(address == null)

  try {
    if (address == null) {
      const sqlAddress =
        "INSERT INTO addresses (`street`, `city`, `zipcode`) VALUES (?, ?, ?)";
      const addressInsert = await pool.query(sqlAddress, [
        street,
        city,
        zipcode,
      ]);
      resultAddress = addressInsert.insertId;
    } else {
      const sqlAddress = `UPDATE addresses SET street = ?, city = ?, zipcode = ? WHERE addressID = ?`;
      await pool.query(sqlAddress, [street, city, zipcode, user[0].addressID]);
      resultAddress = user[0].addressID;
    }
    const sql = `UPDATE users SET userName = ?, name = ?, email = ?, phone = ?, addressID = ? WHERE id = ?`;
    const result = await pool.query(sql, [
      userName,
      name,
      email,
      phone,
      resultAddress,
      id,
    ]);
    const user1 = await getUser(id);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getClients,
  getEmployees,
  getUserByPasswordAndUserName,
  createUser,
  getUser,
  updateUser,
  getClientIDOrEmployeeIDByUserID,
  getClientsEmployee,
  getConnections,
  employeeToClient,
  updateConnection,
  deleteConnection
};
