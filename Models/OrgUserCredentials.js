import mongoose from "mongoose";

const OrgUserCredentials = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("OrganizationCredentials", OrgUserCredentials);
