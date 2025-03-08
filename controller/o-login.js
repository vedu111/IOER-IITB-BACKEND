import OrgUserCredentials from "../Models/OrgUserCredentials.js";
import {OrgUserDetails} from "../Models/OrgUserDetails.js";
import { hashPassword, generateToken, decryptToken } from "../services/generalServices.js";

export const organisationLogin = async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }
    const data = req.cookies.token
 
    const decodedData = decryptToken(data)
   console.log(decodedData)

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
};
