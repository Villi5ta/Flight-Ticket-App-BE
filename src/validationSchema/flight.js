import Joi from "joi";

const flightSchema = Joi.object({
  price: Joi.number().required(),
  departureCity: Joi.string().required(),
  destinationCity: Joi.string().required(),
  destinationCityPhotoUrl: Joi.string().required(),
  departureTime: Joi.string().required(),
  departureAirportIcaoCode: Joi.string().required(),
  arrivalAirportIcaoCode: Joi.string().required(),
  aircraft: Joi.string().required(),
  airline: Joi.string().required(),
  description: Joi.string().required(),
});
export default flightSchema;
