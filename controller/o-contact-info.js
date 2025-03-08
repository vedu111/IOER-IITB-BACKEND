import OrgUserCredentials from "../Models/OrgUserCredentials.js";
import {OrgUserDetails} from "../Models/OrgUserDetails.js";;

export const organisationContactUpdate = async (req, res) => {
  try {
    // Extract username (organization name) & password from request body
    let { contactNumber, email } = req.body;

    // Validate required fields
    if (!contactNumber && !email) {
      return res.status(400).json({ error: "contactNumber or email are required." });
    }

    const id = req._id;
    await OrgUserDetails.findOneAndUpdate(
      { userId: id }, 
      { $set: { "organizationContact.contactNumber": contactNumber, "organizationContact.email": email } }
    );
    
    return res.send({"msg":"contact updated Successfully"})

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
};
