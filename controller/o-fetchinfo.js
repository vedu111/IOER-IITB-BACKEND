import { OrgUserDetails } from "../Models/OrgUserDetails.js";

export const organisationFetchInfo = async (req, res) => {
  try {
   
    // Extract organization ID from request
    const id = req._id 
    
    if (!id) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Fetch organization details
    const data = await OrgUserDetails.findOne({ userId: id });
    
    // If no data found, return a 404 response
    if (!data) {
      return res.status(404).json({ error: "Organization details not found." });
    }

    // Return the found organization details
    return res.status(200).json({ data });

  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
};
