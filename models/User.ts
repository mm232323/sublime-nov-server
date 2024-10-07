import { Document, MongoDBNamespace, WithId } from "mongodb";
import db from "../lib/db";
import { userType } from "../util/types";
const users = db.collection("users");
class User {
  user: WithId<Document> | null = null;
  constructor(user: WithId<Document> | null) {
    this.user = user;
    const postUser = async () => await users.insertOne(this.user!);
    postUser();
  }
  static async getUsers() {
    const usersArr = await users.find().toArray();
    return usersArr;
  }
  static async getUser(query: Object) {
    const selectedUser = await users.findOne(query);
    return selectedUser;
  }
  static async update(searchQ: Object, updateQ: Object) {
    await users.updateOne(searchQ, updateQ);
    return "User Updated";
  }
  static async deleteUser(query: Object) {
    await users.deleteOne(query);
    return "User Deleted";
  }
}
export default User;
