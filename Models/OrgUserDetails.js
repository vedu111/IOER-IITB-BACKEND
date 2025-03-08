import mongoose from "mongoose";

const OrgUserDetailsSchema = new mongoose.Schema({
  organizationName: { type: String, required: false }, 
  organizationContact:{
    contactNumber:Number,
    email:String,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "OrganizationCredentials", required: false }, 
  warehouseItems: [
    {
      itemName: { type: String, required: false },
      itemManufacturer: { type: String, required: false },
      hsCode: { type: String, required: false },
      itemWeight: { type: Number, required: false },
      material:{type:String, required: false }
    }
  ],
  sourceAddresses: [
    { 
      country: { type: String, required: false },
      city: { type: String, required: false },
      floor: { type: String, required: false },
      buildingName: { type: String, required: false },
      googleMapAddress: { type: String, required: false }
    }
  ],
  destinationAddresses: [
    { 
      country: { type: String, required: false },
      city: { type: String, required: false },
      floor: { type: String, required: false },
      buildingName: { type: String, required: false },
      googleMapAddress: { type: String, required: false }
    }
  ]
});

export const OrgUserDetails =  mongoose.model("OrgUserDetailsSchema", OrgUserDetailsSchema);
