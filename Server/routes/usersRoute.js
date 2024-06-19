const express = require("express");
const router = express.Router();
const {
  getById,
  getClientsEmployee,
  update,
  getClients,
  getConnections,
  getEmployees,
  employeeToClient,
  updateConnection,
} = require("../controllers/usersController");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/user", async (req, res) => {
  try {
    const id = req.query.id;
    const result = await getById(id);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/clients", async (req, res) => {
  try {
    const id = req.query.id;
    let clientOfEmployee = null;
    if (id == null) clientOfEmployee = await getClients();
    else {
      const user = await getById(id);
      if (user.role == "Admin") clientOfEmployee = await getClients();
      else clientOfEmployee = await getClientsEmployee(id);
    }
    res.status(200).send(clientOfEmployee);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/employees", async (req, res) => {
  try {
    const employees = await getEmployees();
    res.status(200).send(employees);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/connections", async (req, res) => {
  try {
    const employees = await getConnections();
    res.status(200).send(employees);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// router.get("/type", async (req, res) => {
//   try {
//     const id = req.query.id;
//     const type = await getClientIDOrEmployeeIDByUserID(id);
//     res.status(200).send(type);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// });

router.post("/connection", async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    const clientID = req.body.clientID;
    const connection = await employeeToClient(employeeID, clientID);
    res.status(200).send(connection);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put("/connection", async (req, res) => {
  try {
    const employeeID = req.body.employeeID;
    const clientID = req.body.clientID;
    const id = req.body.id;
    const connection = await updateConnection(employeeID, clientID, id);
    res.status(200).send(connection);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const id = req.query.id;
    await update(
      id,
      req.body.userName,
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.street,
      req.body.city,
      req.body.zipcode
    );
    const result = await getById(id);
    // console.log(result)
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
