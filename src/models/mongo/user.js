import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: { type: String, default: "USER" },
});

export const User = Mongoose.model("User", userSchema);
