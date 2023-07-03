const express = require("express");
const app = express();
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const userDetailsRoute = require("./routes/get_user_details");
const updateProfileRoute = require("./routes/update_profile");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/get-user-details", userDetailsRoute);
app.use("/update-profile", updateProfileRoute);

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.closeServer = () => {
  server.close();
};

module.exports = app;
