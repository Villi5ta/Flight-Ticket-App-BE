import mongoose from "mongoose";
import FlightGroupModel from "../models/flight_group.js";

const CREATE_FLIGHT_GROUP = async (req, res) => {
  try {
    const group = new FlightGroupModel({
      user: req.body.user,
      noOfPassengers: req.body.noOfPassengers,
      flight_ids: [],
    });

    const response = await group.save();

    res.status(201).json({
      status: "Flight group has been created.",
      response: response,
    });
  } catch (error) {
    console.log("ERROR HANDLED");
    return res
      .status(500)
      .json({ message: "Error detected in creating flight" });
  }
};

const GET_ALL_FLIGHTS_GROUPS = async (req, res) => {
  try {
    const flights = await FlightGroupModel.aggregate([
      {
        $lookup: {
          from: "flights",
          localField: "flight_ids",
          foreignField: "flightId",
          as: "User picked flights",
        },
      },
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    ]).exec();

    return res.json({ flights: flights });
  } catch (error) {
    console.log("ERROR HANDLED");
    return res
      .status(500)
      .json({ message: "Error detected in getting flights" });
  }
};
const GET_FLIGHT_GROUP_BY_ID = async (req, res) => {
  try {
    const flights = await FlightGroupModel.find();
    const flight = flights.filter((f) => f.flightId === Number(req.params.id));
    console.log(flights.flightId);
    console.log(req.params.id);
    return res.json({ flight: flight[0] });
  } catch (error) {
    console.log("ERROR HANDLED");
    return res
      .status(500)
      .json({ message: "Error detected in getting flight" });
  }
};

export { CREATE_FLIGHT_GROUP, GET_ALL_FLIGHTS_GROUPS, GET_FLIGHT_GROUP_BY_ID };
