import OrgUserCredentials from "../Models/OrgUserCredentials.js";
import { decryptToken } from "../services/generalServices.js";

export const checkOrgLogin = async (req, res, next) => {
  try {
    // Check if token exists in cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "Please login or sign up" });
    }

    // Decrypt token to get user ID
    const decoded = decryptToken(token);
    if (!decoded?.id) {
      return res.status(401).json({ msg: "Invalid token, please login again" });
    }

    // Find organization in database
    const foundOrg = await OrgUserCredentials.findById(decoded.id);
    if (!foundOrg) {
      return res.status(401).json({ msg: "Organization not found, please sign up" });
    }
    req._id = decoded.id

    // Authentication successful, proceed to next middleware
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
