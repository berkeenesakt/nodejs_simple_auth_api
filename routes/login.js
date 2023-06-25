const express = require("express");
const router = express.Router();
const loginModel = require("../model/login_model");

router.post("/", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      SCC: false,
      err: "Missing body parameter(s): email and/or password",
    });
  } else {
    try {
      const user = await loginModel.findByEmail(req.body.email);
      if (!user) {
        res.status(404).send({
          SCC: false,
          err: "User not found",
        });
        return;
      }
      const isPasswordCorrect = await loginModel.comparePassword(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        res.status(401).send({
          SCC: false,
          err: "Password is incorrect",
        });
      }
      const token = await loginModel.generateToken(user);
      res.send({
        SCC: true,
        token: token,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
});

module.exports = router;
