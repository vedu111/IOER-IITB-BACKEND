import mongoose from "mongoose";

const BaseUserCredentials = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "OrganizationCredentials", required: true }
});

export default mongoose.model("BaseUserCredentials", BaseUserCredentials);
