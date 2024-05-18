import { v4 as uuidv4 } from "uuid";
import FlightModel from "../models/flight.js";
import FlightGroupModel from "../models/flight_group.js";

const CREATE_FLIGHT = async (req, res) => {
  try {
    const flight = new FlightModel({
      flightId: uuidv4(),
      ...req.body,
      // price: req.body.price,
      // departureCity: req.body.departureCity,
      // destinationCity: req.body.destinationCity,
      // destinationCityPhotoUrl: req.body.destinationCityPhotoUrl,
      // departureTime: req.body.departureTime,
      // //
      // departureAirportIcaoCode: req.body.departureAirportIcaoCode,
      // arrivalAirportIcaoCode: req.body.arrivalAirportIcaoCode,
      // aircraft: req.body.aircraft,
      // airline: req.body.airline,
    });

    const response = await flight.save();

    await FlightGroupModel.findByIdAndUpdate(req.params.groupId, {
      $push: { flight_ids: flight.flightId },
    });

    res.status(201).json({
      status: "Information has been uploaded, have a safe flight.",
      response: response,
    });
  } catch (error) {
    console.log("ERROR HANDLED");
    return res
      .status(500)
      .json({ message: "Error detected in creating flight" });
  }
};

const GET_ALL_FLIGHTS = async (req, res) => {
  try {
    // const flights = await FlightModel.find({ userId: req.body.userId });
    const flights = await FlightModel.find();
    return res.json({ flights: flights });
  } catch (error) {
    console.log("ERROR HANDLED");
    return res
      .status(500)
      .json({ message: "Error detected in getting flights" });
  }
};

const GET_FLIGHT_BY_ID = async (req, res) => {
  try {
    const flights = await FlightModel.find();
    const flight = flights.filter((f) => f.flightId === req.params.id);
    return res.json({ flight: flight[0] });
  } catch (error) {
    console.log("ERROR HANDLED");
    return res
      .status(500)
      .json({ message: "Error detected in getting flight" });
  }
};

const DELETE_FLIGHT_BY_ID = async (req, res) => {
  try {
    const flight = await FlightModel.findOne({ flightId: req.params.id });

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    if (flight.userId !== req.body.userId) {
      return res
        .status(401)
        .json({ message: "Flight does not belong to user" });
    }

    const response = await FlightModel.deleteOne({ flightId: req.params.id });

    return res
      .status(200)
      .json({ message: "Flight deleted", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  // const trimmedFlightList = flights.filter((flight) => {
  //   return req.params.id !== flight.flightId;
  // });

  // flights = trimmedFlightList;

  // return res.json({
  //   message: `Flight with the following ID (${req.params.id}) has been deleted`,
  // });
};

const UPDATE_FLIGHT_BY_ID = (req, res) => {
  const index = flights.findIndex((flight) => {
    return flight.flightId === Number(req.params.id);
  });

  flights[index] = { ...flights[index], ...req.body };

  return res.json({ updatedFlight: flights[index] });
};

const PAGINATE_FLIGHTS = (req, res) => {
  const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
  const pageNumber = parseInt(req.query.pageNumber) || 1;

  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedFlights = flights.slice(startIndex, endIndex);

  return res.json({ flights: paginatedFlights });
};

export {
  CREATE_FLIGHT,
  GET_ALL_FLIGHTS,
  GET_FLIGHT_BY_ID,
  DELETE_FLIGHT_BY_ID,
  UPDATE_FLIGHT_BY_ID,
  PAGINATE_FLIGHTS,
};
