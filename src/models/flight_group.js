import mongoose from "mongoose";

const flightGroupSchema = mongoose.Schema({
  user: { type: String, required: true },
  noOfPassengers: { type: Number, required: true },
  flight_ids: { type: Array },
});

export default mongoose.model("FlightGroup", flightGroupSchema);
