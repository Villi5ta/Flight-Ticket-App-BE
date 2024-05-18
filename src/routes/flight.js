import express from "express";
import {
  CREATE_FLIGHT,
  GET_ALL_FLIGHTS,
  GET_FLIGHT_BY_ID,
  DELETE_FLIGHT_BY_ID,
  UPDATE_FLIGHT_BY_ID,
  PAGINATE_FLIGHTS,
} from "../controllers/flight.js";

import authUser from "../middlewares/auth.js";
import validateData from "../middlewares/validation.js";
import flightSchema from "../validationSchema/flight.js";

const router = express.Router();

router.post("/flights", validateData(flightSchema), authUser, CREATE_FLIGHT);

router.get("/flights/paginate", authUser, PAGINATE_FLIGHTS);
router.get("/flights", authUser, GET_ALL_FLIGHTS);
router.get("/flights/:id", authUser, GET_FLIGHT_BY_ID);

router.put("/flights/update/:id", UPDATE_FLIGHT_BY_ID);

router.delete("/flights/delete/:id", authUser, DELETE_FLIGHT_BY_ID);

export default router;

// Flight data

// {
//   "price": 25,
//   "departureCity": "London",
//   "destinationCity": "Kaunas",
//   "destinationCityPhotoUrl": "https://visit.kaunas.lt/assets/NAUJOS-NUOTRAUKOS/_resampled/FillWyIxMDUwIiwiNTI1Il0/oldtown-20210000.jpg",
//   "departureTime": "03-31, 12:00",
//   "departureAirportIcaoCode": "EGLL",
//   "arrivalAirportIcaoCode": "EYKA",
//   "aircraft": "A320 Neo",
//   "airline": "Wizz Air"
// }

// {
//     "price": 3000,
//     "departureCity": "New York",
//     "destinationCity": "Singapore",
//     "destinationCityPhotoUrl": "https://a.cdn-hotels.com/gdcs/production93/d422/118f3050-41af-4c7b-9651-3428a0e894d9.jpg?impolicy=fcrop&w=800&h=533&q=medium",
//     "departureTime": "03-29, 05:00",
//     "departureAirportIcaoCode": "KJFK",
//     "arrivalAirportIcaoCode": "WSSS",
//     "aircraft": "A350-900",
//     "airline": "Singapore Airlines"
//   }

// {
//     "price": 700,
//     "departureCity": "Dubai",
//     "destinationCity": "Tokyo",
//     "destinationCityPhotoUrl": "https://assets.editorial.aetnd.com/uploads/2013/07/gettyimages-1390815938.jpg",
//     "departureTime": "03-27, 11:40",
//     "departureAirportIcaoCode": "OMDB",
//     "arrivalAirportIcaoCode": "RJTT",
//     "aircraft": "A380-800",
//     "airline": "Emirates Airlines"

//   }

// {
//     "price": 700,
//     "departureCity": "Frankfurt",
//     "destinationCity": "Miami",
//     "destinationCityPhotoUrl": "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/471000/471674-Miami.jpg",
//     "departureTime": "03-27, 13:47",
//     "departureAirportIcaoCode": "EDDF",
//     "arrivalAirportIcaoCode": "KMIA",
//     "aircraft": "747-800",
//     "airline": "Lufthansa"

//   }
