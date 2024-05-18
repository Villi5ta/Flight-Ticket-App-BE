import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const SIGN_UP = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new userModel({
      id: uuidv4(),
      full_name: req.body.full_name,
      email: req.body.email,
      password: hash,
      flights: [],
    });

    const response = await newUser.save();

    console.log(newUser);

    res.status(201).json({
      status: "User has been created",
      response: response,
    });
  } catch (error) {
    console.log("ERROR HANDLED");
    return res.status(500).json({ message: "Error detected in creating user" });
  }
};

const LOG_IN = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) return res.status(500).json({ message: "User data not found" });

    const doesPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!doesPasswordMatch)
      return res.status(400).json({ message: "User data not found" });

    const jwt_token = jwt.sign(
      { email: user.email, user_id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({ jwt: jwt_token, message: "Log in successful" });
  } catch (error) {
    console.log("ERROR HANDLED");
    return res.status(500).json({ message: "Error in login" });
  }
};

export { SIGN_UP, LOG_IN };
