import OrgUserCredentials from "../Models/OrgUserCredentials.js";
import { hashPassword, generateToken } from "../services/generalServices.js";
import bcrypt from "bcrypt";

export const organisationLogin = async (req, res) => {
  try {
    let { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Find the organization by username
    const FoundOrg = await OrgUserCredentials.findOne({ userName: username });

    if (!FoundOrg) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, FoundOrg.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Generate authentication token
    const token = generateToken(FoundOrg._id, "Org");

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
};
