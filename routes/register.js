const express = require("express");
const router = express.Router();
const registerModel = require("../model/register_model");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).send({
      SCC: false,
      err: "Missing body parameter(s): name, email and/or password",
    });
    return;
  }
  try {
    const existingUser = await registerModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(400).send({
        SCC: false,
        err: "User with this email already exists",
      });
      return;
    }
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      created_at: new Date(),
    };
    await registerModel.create(user);
    res.status(200).send({
      SCC: true,
      msg: "User created successfully",
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
