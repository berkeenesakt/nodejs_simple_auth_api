const express = require("express");
const app = express();
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
