const client = require("../db");
const bcrypt = require("bcrypt");

const loginModel = {
  findByEmail: async (email) => {
    await client.connect();
    const database = client.db("auth");
    const collection = database.collection("users");
    const user = await collection.findOne({ email });
    client.close();
    return user;
  },
  comparePassword: async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    return result;
  },
};

module.exports = loginModel;
