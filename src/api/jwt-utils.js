import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";

const result = dotenv.config();

// create jwt token
export function createToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const options = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.cookie_password, options);
}

// decode jwt token
export function decodeToken(token) {
  const userInfo = {};
  try {
    const decoded = jwt.verify(token, process.env.cookie_password);
    userInfo.userId = decoded.id;
    userInfo.email = decoded.email;
    userInfo.role = decoded.role;
  } catch (e) {
    console.log(e.message);
  }
  return userInfo;
}

// validate is a legit user
export async function validate(decoded, request) {
  const user = await db.userStore.getUserById(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}

// validate user is an admin
export async function validateAdmin(decoded, request) {
    const user = await db.userStore.getUserById(decoded.id);
    if (!user) {
      return { isValid: false };
    }
    if (user.role !== "ADMIN") {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  }
