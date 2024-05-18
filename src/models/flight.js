import mongoose from "mongoose";

const flightSchema = mongoose.Schema({
  price: { type: Number, required: true },
  departureCity: { type: String, required: true, min: 3 },
  destinationCity: { type: String, required: true, min: 3 },
  destinationCityPhotoUrl: { type: String, required: true, min: 7 },
  departureTime: { type: String, required: true, min: 4 },
  departureAirportIcaoCode: { type: String, required: true, min: 4 },
  arrivalAirportIcaoCode: { type: String, required: true, min: 4 },
  aircraft: { type: String, required: true },
  airline: { type: String, required: true, min: 4 },
  flightId: { type: String, required: true },
  userId: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("Flight", flightSchema);
