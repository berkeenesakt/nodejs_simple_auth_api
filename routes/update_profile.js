const UserProfile = require("../routes/update_profile");
const express = require("express");
const app = express.Router();

// Update email
app.put("/users/:id/email", async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const result = await UserProfile.updateEmail(id, email);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update name
app.put("/users/:id/name", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await UserProfile.updateName(id, name);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update password
app.put("/users/:id/password", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const result = await UserProfile.updatePassword(id, password);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
