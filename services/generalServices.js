import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const generateToken = (userId, type) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log("JWT Secret is undefined in environment variables");
      throw new ValidationError("JWT Secret not defined", 500);
    }
    return jwt.sign({ id: userId, type: type }, secret, { expiresIn: "30d" });
  } catch (error) {
    console.log(error)
  }
};

export const decryptToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log("JWT Secret is undefined in environment variables");
      throw new ValidationError("JWT Secret not defined", 500);
    }
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      console.log("Invalid token", 401);
    }
    if (error.name === 'TokenExpiredError') {
      console.log("Token has expired", 401);
    }
    console.log("Error verifying token", 500);
  }
};

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log("Error hashing password",error);
  }
};