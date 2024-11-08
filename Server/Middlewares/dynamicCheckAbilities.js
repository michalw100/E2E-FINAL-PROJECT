const express = require("express");
const router = express.Router();
const checkAbilities = require("../Middlewares/checkAbilities");

router.use(express.json());

const dynamicCheckAbilities = (req, res, next) => {
  const role = req.body.userRole;
  if (!role) {
    return res.status(403).send({ message: "User not authenticated" });
  }
  let subject;
  switch (role) {
    case "Client":
      subject = "Clients";
      break;
    case "Admin":
    case "Role 1":
    case "Role 2":
    default:
      subject = "Employees";
      break;
  }
  const abilityMiddleware = checkAbilities("create", subject);
  abilityMiddleware(req, res, next);
};

module.exports = dynamicCheckAbilities;
