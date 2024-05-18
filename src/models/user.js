import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  flights: { type: Array },
});

export default mongoose.model("User", userSchema);
