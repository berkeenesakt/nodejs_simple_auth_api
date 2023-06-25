const jwt = require("jsonwebtoken");
const login_model = require("./login_model");

const userModel = {
  getUser: async (token) => {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return login_model.findByEmail(decodedToken.email);
  },
};

module.exports = userModel;
