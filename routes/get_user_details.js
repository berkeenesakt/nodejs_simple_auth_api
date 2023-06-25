const express = require("express");
const router = express.Router();
const userModel = require("../model/user_model");

router.post("/", async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = await userModel.getUser(token);
      user.password = undefined;
      res.send({
        SCC: true,
        user: user,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(401).send({
      SCC: false,
      err: "Missing authorization header",
    });
  }
});

module.exports = router;
