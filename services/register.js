const client = require("../db");
class Registration {
  static async create(user) {
    try {
      await client.connect();
      const database = client.db("auth");
      const collection = database.collection("users");
      const result = await collection.insertOne(user);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create user");
    } finally {
      client.close();
    }
  }

  static async findOne(filter) {
    try {
      await client.connect();
      const database = client.db("auth");
      const collection = database.collection("users");
      const result = await collection.findOne(filter);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to find user");
    } finally {
      client.close();
    }
  }
}

module.exports = Registration;
