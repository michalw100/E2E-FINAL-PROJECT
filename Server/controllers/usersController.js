const model = require("../models/usersModel");
const bcrypt = require("bcrypt");
const { AbilityBuilder, Ability } = require("@casl/ability");
const { defineAbilitiesFor } = require("../Middlewares/abilities");

async function getConnections() {
  try {
    const connections = await model.getConnections();
    // console.log(clientsEmployee[0]);
    return connections[0];
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
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await model.createUser(
      userName,
      hashedPassword,
      employeType,
      role
    );
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
    return await model.updateUser(
      id,
      userName,
      name,
      email,
      phone,
      street,
      city,
      zipcode
    );
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
  getClients,
  getConnections,
  employeeToClient,
  updateConnection,
  deleteConnection,
  getClientIDOrEmployeeIDByUserID,
};
