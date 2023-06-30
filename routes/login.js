const express = require("express");
const router = express.Router();
const login = require("../services/login");

router.post("/", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      SCC: false,
      err: "Missing body parameter(s): email and/or password",
    });
  } else {
    try {
      const user = await login.findByEmail(req.body.email);
      if (!user) {
        res.status(400).send({
          SCC: false,
          err: "User not found.",
        });
        return;
      }
      const isPasswordCorrect = await login.comparePassword(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        res.status(400).send({
          SCC: false,
          err: "Password is incorrect",
        });
      } else {
        const token = await login.generateToken(user);
        res.send({
          SCC: true,
          token: token,
        });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
});

module.exports = router;
