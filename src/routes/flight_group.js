import express from "express";
import {
  CREATE_FLIGHT_GROUP,
  GET_ALL_FLIGHTS_GROUPS,
  GET_FLIGHT_GROUP_BY_ID,
} from "../controllers/flight_group.js";

const router = express.Router();

router.post("/group", CREATE_FLIGHT_GROUP);

router.get("/group/:id", GET_ALL_FLIGHTS_GROUPS);

router.get("/group/:id", GET_FLIGHT_GROUP_BY_ID);

export default router;
