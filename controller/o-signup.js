import OrgUserCredentials from "../Models/OrgUserCredentials.js";
import {OrgUserDetails} from "../Models/OrgUserDetails.js";
import { hashPassword, generateToken } from "../services/generalServices.js";

export const organisationSignup = async (req, res) => {
  try {
    // Extract username (organization name) & password from request body
    let { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Hash the password before storing
    const hashedPassword = await hashPassword(password);

    // Create Organization Credentials
    const createdOrg = await OrgUserCredentials.create({
      userName: username,
      password: hashedPassword
    });

    console.log("Organization Created:", createdOrg);

    // Get the newly created Organization's ID
    const orgId = createdOrg._id;

    // Create Organization Details Entry
    await OrgUserDetails.create({
      organizationName: username,
      userId: orgId
    });

    // Generate Authentication Token
    const token = generateToken(orgId, "Org");

    // Set Token in Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.status(200).json({ message: "ORG REGISTER successful", token });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
};
