import express from "express"
import { checkOrgLogin } from "../../middleware/orgAuthMiddleware.js";
import { organisationContactUpdate } from "../../controller/o-contact-info.js";
import { organisationAddItem } from "../../controller/o-addItem.js";
import { organisationAddSourceAd } from "../../controller/o-addSourceItem.js";
import { organisationAddDesteAd } from "../../controller/o-addDestItem.js";
import { organisationFetchInfo } from "../../controller/o-fetchinfo.js";
import { OrgUserDetails } from "../../Models/OrgUserDetails.js";
import { Shipment } from "../../Models/shipment.js";

const router = express.Router();


router.post("/api/v1/org/contactInfo",
  checkOrgLogin,
  organisationContactUpdate
)

router.post("/api/v1/org/add/item",
  checkOrgLogin,
  organisationAddItem
)


router.post("/api/v1/org/add/source",
  checkOrgLogin,
  organisationAddSourceAd
)

router.post("/api/v1/org/add/destination",
  checkOrgLogin,
  organisationAddDesteAd
)

router.get("/api/v1/org/detailed/info",
  checkOrgLogin,
  organisationFetchInfo
)


router.post("/api/v1/org/shipment/box", checkOrgLogin, async (req, res) => {
  try {
    const { shipmentId,items } = req.body;
    const userId = req._id;

    await Shipment.findByIdAndUpdate(shipmentId, { $addToSet: { boxes:  items } });

   res.send({msg:"saved"})
  } catch (error) {
    console.error("Error creating shipment:", error);
    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});



router.post("/api/v1/org/shipment/create", checkOrgLogin, async (req, res) => {
  try {
    const { sourceAddress, destinationAddress, boxes } = req.body;
    const userId = req._id;

    // Validate required fields
    if (!sourceAddress || !destinationAddress) {
      return res.status(400).json({ error: "Source and destination addresses are required." });
    }

    // Find organization details
    const orgData = await OrgUserDetails.findOne({ userId });

    if (!orgData) {
      return res.status(404).json({ error: "Organization details not found." });
    }

    // Create new shipment
    const newShipment = new Shipment({
      userId: orgData.userId,
      organizationName: orgData.organizationName,
      organizationContact: orgData.organizationContact,
      sourceAddress,
      destinationAddress,
      shipmentDate: new Date(),
      boxes: boxes || []
    });

    // Save shipment in database
    await newShipment.save();

    return res.status(201).json({
      message: "Shipment created successfully",
      shipmentId: newShipment._id,
      status: "Pending"
    });

  } catch (error) {
    console.error("Error creating shipment:", error);
    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});



export default router