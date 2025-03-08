import OrgUserCredentials from "../Models/OrgUserCredentials.js";
import {OrgUserDetails} from "../Models/OrgUserDetails.js";
import { hashPassword, generateToken } from "../services/generalServices.js";

export const organisationAddItem = async (req, res) => {
  try {
    
    const data = req.body
    const id = req._id
    await OrgUserDetails.findOneAndUpdate({userId:id},{
      $addToSet:{
        warehouseItems:data
      }
    })
    

    return res.status(200).json({ message: "item added successfully" });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
};
