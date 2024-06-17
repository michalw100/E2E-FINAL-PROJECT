const express = require("express");
const router = express.Router();
const { sendMail } = require('../services/mailService');
const {
  getById,
  getClientsEmployee,
  update,
  getClients,
  // getClientIDOrEmployeeIDByUserID,
  getEmployees
} = require("../controllers/usersController");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/clients", async (req, res) => {
  try {
    const id = req.query.id;
    const clientOfEmployee = await getClientsEmployee(id);
    res.status(200).send(clientOfEmployee);
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

router.get("/", async (req, res) => {
  try {
    const id = req.query.id;
    const user = await getById(id);
    res.status(200).send(user);
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


router.get("/clients", async (req, res) => {
  try {
    const clients = await getClients();
    res.status(200).send(clients);
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
