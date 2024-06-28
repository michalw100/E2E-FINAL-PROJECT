const model = require("../models/usersModel");
const bcrypt = require("bcrypt");
const { defineAbilitiesFor } = require("../Middlewares/abilities");
const { StreamChat } = require("stream-chat");
require("dotenv").config();

async function getConnections() {
  try {
    const connections = await model.getConnections();
    // console.log(clientsEmployee[0]);
    return connections[0];
  } catch (err) {
    throw err;
  }
}
async function getClientByCkientId(id) {
  try {
    const user = await model.getClientByCkientId(id);
    // console.log(clientsEmployee[0]);
    return user[0];
  } catch (err) {
    throw err;
  }
}

async function deleteConnection(employeeID, clientID) {
  try {
    const connections = await model.deleteConnection(employeeID, clientID);
    return connections[0];
  } catch (err) {
    throw err;
  }
}

async function employeeToClient(employeeID, clientID) {
  try {
    const employeeUserID = await getClientIDOrEmployeeIDByUserID(employeeID);
    const clientUserID = await getClientIDOrEmployeeIDByUserID(clientID);
    const connections = await model.employeeToClient(
      employeeUserID.employee_id,
      clientUserID.client_id
    );
    // console.log(clientsEmployee[0]);
    return connections[0];
  } catch (err) {
    throw err;
  }
}

async function updateConnection(employeeID, clientID, id) {
  try {
    const connections = await model.updateConnection(employeeID, clientID, id);
    // console.log(clientsEmployee[0]);
    return connections[0];
  } catch (err) {
    throw err;
  }
}

async function getClientsEmployee(id) {
  try {
    const idEmployee = await getClientIDOrEmployeeIDByUserID(id);

    console.log(idEmployee);
    const clientsEmployee = await model.getClientsEmployee(
      idEmployee.employee_id
    );
    return clientsEmployee[0];
  } catch (err) {
    throw err;
  }
}

async function getEmployees() {
  try {
    const employees = await model.getEmployees();
    // console.log(clientsEmployee[0]);
    return employees[0];
  } catch (err) {
    throw err;
  }
}

async function getManagers(id) {
  try {
    const managers = await model.getManagers();
    const employees = await model.getEmployeesOfClient(id);
    // console.log(clientsEmployee[0]);
    return [...employees[0], ...managers[0]];
  } catch (err) {
    throw err;
  }
}

async function getClients() {
  try {
    const clients = await model.getClients();
    // console.log(clientsEmployee[0]);
    return clients[0];
  } catch (err) {
    throw err;
  }
}

async function getClientIDOrEmployeeIDByUserID(id) {
  try {
    const type = await model.getClientIDOrEmployeeIDByUserID(id);
    // console.log(clientsEmployee[0]);
    return type[0];
  } catch (err) {
    throw err;
  }
}

async function getById(id) {
  try {
    const userResult = await model.getUser(id);
    const user = userResult[0];

    if (user && !user.role) {
      user.role = "Client";
    }

    if (user) {
      const abilities = defineAbilitiesFor(user.role);
      const { password, ...userWithoutPassword } = user; // במקרה שמידע הסיסמה קיים ויש להוציאו מהתשובה
      return { ...userWithoutPassword, abilities };
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    throw err;
  }
}

async function create(userName, password, employeType, role) {
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await model.createUser(
      userName,
      hashedPassword,
      employeType,
      role
    );
    const serverClient = StreamChat.getInstance(apiKey, apiSecret);

    try {
      console.log("response.insertId");
      console.log(response.insertId);
      await serverClient.upsertUser({
        id: `user-${response.insertId}`,
        name: userName,
      });
    } catch (streamError) {
      throw new Error(`Stream Chat Error: ${streamError.message}`);
    }

    const myToken = serverClient.createToken(`user-${response.insertId}`);
    console.log(myToken);
    model.updateStreamToken(myToken, response.insertId);

    return { userID: response.insertId };
  } catch (err) {
    if (
      err.sqlMessage == `Duplicate entry '${userName}' for key 'users.userName'`
    )
      throw new Error("UserName already exist");
    throw err;
  }
}

async function getByPasswordAndUserName(password, userName) {
  try {
    const result = await model.getUserByPasswordAndUserName(userName);
    const user = result[0];
    if (!user) {
      throw new Error(
        "User does not exist in the system. Want to create an account? Contact Us 02-6237600 or yael.b@c-b-cpa.co.il"
      );
    }
    if (!user.role) {
      user.role = "Client";
    }
    if (bcrypt.compareSync(password, user.password)) {
      const { password, ...userWithoutPassword } = user;
      const abilities = defineAbilitiesFor(user.role);
      return { ...userWithoutPassword, abilities };
    } else {
      throw new Error("The password or username is incorrect");
    }
  } catch (err) {
    throw err;
  }
}

async function update(id, userName, name, email, phone, street, city, zipcode) {
  try {
    const user = await model.updateUser(
      id,
      userName,
      name,
      email,
      phone,
      street,
      city,
      zipcode
    );
    return user;
  } catch (err) {
    throw err;
  }
}

const { sendMail } = require("../services/mailService");

const sendToOurEmail = (req, res) => {
  const { email, name, subject, text } = req.body;
  sendMail(email, subject, text, name);
  res.send("Welcome email sent!");
};

module.exports = {
  update,
  getClientsEmployee,
  getByPasswordAndUserName,
  create,
  getById,
  sendToOurEmail,
  getEmployees,
  getManagers,
  getClients,
  getConnections,
  employeeToClient,
  updateConnection,
  deleteConnection,
  getClientIDOrEmployeeIDByUserID,
  getClientByCkientId,
};
