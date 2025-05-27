import Mongoose from "mongoose";
import { User } from "./user.js";
import { saltAndHashPassword, comparePassword } from "../../utils/hash-utils.js";
import { hash } from "bcrypt";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {

    try {
       // hash and add salt to password
    console.log("STORE: addUser called with user email:", user.email);

    let password = user.password;
    console.log("STORE: Hashing password for user:", user.email);

    let hashedPassword = await saltAndHashPassword(password);

    user.password = hashedPassword;
  
    // create new user
    const newUser = new User(user);
    console.log("STORE: Attempting to save new Mongoose user:", user.email);



    // save user
    const userObj = await newUser.save();
    console.log("STORE: User saved to DB, id:", userObj._id.toString());

    const u = await this.getUserById(userObj._id);
    if (u) {
      console.log("STORE: User fetched after save:", u.email);
  } else {
      console.warn("STORE: User not found by ID after save, ID:", userObj._id.toString());
      // This scenario could lead to the Boom.internal error if 'u' is null and returned
  }
    return u;
    } catch (error) {
      console.error("error ading user", error)
    }
   
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },


  
};
