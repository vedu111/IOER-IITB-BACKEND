import mongoose from "mongoose";

const ShipmentSchema = new mongoose.Schema({
  organizationName: { type: String, required: true }, // Made required
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "OrganizationCredentials", required: false }, 
  organizationContact: {
    contactNumber: { 
      type: Number, 
      required: false,
      validate: {
        validator: function (num) {
          return /^[0-9]{10,15}$/.test(num.toString()); // Ensures a valid phone number
        },
        message: "Invalid contact number. Must be 10-15 digits."
      }
    },
    email: { 
      type: String, 
      required: false,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format."] 
    }
  },

  sourceAddress: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    floor: { type: String, required: false },
    buildingName: { type: String, required: false },
    googleMapAddress: { type: String, required: false }
  },

  destinationAddress: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    floor: { type: String, required: false },
    buildingName: { type: String, required: false },
    googleMapAddress: { type: String, required: false }
  },

  shipmentDate: { type: Date, default: Date.now },

  boxes: [
    {
      boxType: { 
        type: String, 
        enum: ["small", "medium", "large"], 
        required: true 
      },
      packageType: { 
        type: String, 
        enum: ["box", "fragile", "pallet"], 
        required: true 
      },      
      dimensions: { 
        length: { type: Number, required: true }, 
        width: { type: Number, required: true }, 
        height: { type: Number, required: true } 
      },

      maxWeight: { type: Number, required: true }, // Prevent exceeding weight

      items: [
        {
          itemName: { type: String, required: true },
          itemManufacturer: { type: String, required: false },
          hsCode: { type: String, required: false },
          itemWeight: { type: Number, required: true, min: 0 }, // Must be positive
          material: { type: String, required: false }
        }
      ],

      totalWeight: { type: Number, required: false, default: 0 } // Default 0
    }
  ],
  status:{type:String , default:"pending"}
});

// 🔹 **Pre-save Hook to Calculate & Validate Total Weight**
ShipmentSchema.pre("save", function (next) {
  this.boxes.forEach(box => {
    const totalWeight = box.items.reduce((sum, item) => sum + (item.itemWeight || 0), 0);
    
    if (totalWeight > box.maxWeight) {
      return next(new Error(`Total weight (${totalWeight}kg) exceeds max allowed weight (${box.maxWeight}kg) for box type ${box.boxType}`));
    }

    box.totalWeight = totalWeight;
  });
  
  next();
});

export const Shipment = mongoose.model("Shipment", ShipmentSchema);
