const express = require("express");
const router = express.Router();
const { StreamChat } = require("stream-chat");
require("dotenv").config();

const { getByPasswordAndUserName } = require("../controllers/usersController");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  try {
    // const apiKey = process.env.STREAM_API_KEY;
    // const apiSecret = process.env.STREAM_API_SECRET;
    // const serverClient = StreamChat.getInstance(apiKey, apiSecret);

    const userName = req.body.userName;
    const password = req.body.password;
    const user = await getByPasswordAndUserName(password, userName);
    req.session.user = {
      id: user.id,
      username: user.userName,
      role: user.role,
    };
    // try {
    //   await serverClient.upsertUser({
    //     id: `user-${user.id}`,
    //     name: userName,
    //   });
    // } catch (streamError) {
    //   throw new Error(`Stream Chat Error: ${streamError.message}`);
    // }

    // const myToken = serverClient.createToken(`user-${response.user.id}`);
    // console.log(myToken);
    // model.updateStreamToken(myToken, response.user.id);
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
