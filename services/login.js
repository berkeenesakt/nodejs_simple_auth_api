const client = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Login {
  static async findByEmail(email) {
    await client.connect();
    const database = client.db("auth");
    const collection = database.collection("users");
    const user = await collection.findOne({ email });
    client.close();
    return user;
  }

  static async comparePassword(password, hash) {
    const result = await bcrypt.compare(password, hash);
    return result;
  }

  static async generateToken(user) {
    const token = await jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    return token;
  }
}

module.exports = Login;
