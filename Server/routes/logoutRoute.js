const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // console.log("req.session - logout")
    // console.log(req.session)
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ message: 'Failed to logout' });
        }
        res.clearCookie('connect.sid');
        res.status(200).send({ message: 'Logged out successfully' });
    });
});

module.exports = router;