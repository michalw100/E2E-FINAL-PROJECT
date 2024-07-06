const express = require("express");
const router = express.Router();
const {
  getById,
  update,
  getManagers,
  // getClientByCkientId,
} = require("../controllers/usersController");
const checkAbilities = require("../Middlewares/checkAbilities");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/user", checkAbilities("read", "Clients"), async (req, res) => {
  try {
    const id = req.query.id;
    const result = await getById(id);
    checkAbilities("read", result.role);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/chatMembers", async (req, res) => {
  try {
    const id = req.query.id;
    const members = await getManagers(id);
    // console.log("members");
    // console.log(members);
    res.status(200).send([members]);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put("/user", checkAbilities("update", "Users"), async (req, res) => {
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

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
