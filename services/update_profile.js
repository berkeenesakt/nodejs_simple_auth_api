const client = require("../db");

class UserProfile {
  static async updateEmail(userId, newEmail) {
    try {
      await client.connect();
      const database = client.db("auth");
      const collection = database.collection("users");
      const result = await collection.updateOne(
        { _id: userId },
        { $set: { email: newEmail } }
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update email");
    } finally {
      client.close();
    }
  }
  static async updateName(userId, newName) {
    try {
      await client.connect();
      const database = client.db("auth");
      const collection = database.collection("users");
      const result = await collection.updateOne(
        { _id: userId },
        { $set: { name: newName } }
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update name");
    } finally {
      client.close();
    }
  }
  static async updatePassword(userId, newPassword) {
    try {
      var password = await bcrypt.hash(newPassword, 10);
      await client.connect();
      const database = client.db("auth");
      const collection = database.collection("users");
      const result = await collection.updateOne(
        { _id: userId },
        { $set: { password: password } }
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to change password");
    } finally {
      client.close();
    }
  }
}

module.exports = UserProfile;
