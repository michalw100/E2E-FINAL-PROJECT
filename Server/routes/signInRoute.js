const express = require("express");
const router = express.Router();

const { getByPasswordAndUserName } = require("../controllers/usersController");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  try {
    // console.log("sign in")
    const userName = req.body.userName;
    const password = req.body.password;
    const user = await getByPasswordAndUserName(password, userName);
    req.session.user = {
      id: user.id,
      username: user.userName,
      role: user.role,
    };
    // console.log("signin");
    // console.log(user);
    res.status(200).send(user);
  } catch (err) {
    if (err.message == "User does not exist in the system. Want to create an account? Contact Us 02-6237600 or yael.b@c-b-cpa.co.il")
      res.status(400).send({ message: err.message });
    else if (err.message == "the password or userName is incorrect")
      res.status(400).send({ message: err.message });
    else res.status(500).send({ message: err.message });
  }
});

module.exports = router;
