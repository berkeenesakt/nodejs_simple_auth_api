const express = require("express");
const router = express.Router();
const userService = require("../services/user");

router.get("/", async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = await userService.getUser(token);
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
