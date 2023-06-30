const jwt = require("jsonwebtoken");
const Login = require("../services/login");

class User {
  static async getUser(token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return Login.findByEmail(decodedToken.email);
  }
}

module.exports = User;
