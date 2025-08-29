import jwt from "jsonwebtoken";

import { ENV_VARIABLES } from "../config/environmentVariables.js";

export const createTokenThenSetCookie = (userId, res) => {
  //userId -> When decoding i can get data from userId and decode it
  const token = jwt.sign({ userId }, ENV_VARIABLES.JWT_SECRET, {
    expiresIn: "7d",
  }); // Create token

  res.cookie("jwt-token-netflix-project", token, {
    // Give your token a name and pass some options in order to make it more secure
    maxAge: 7 * 24 * 60 * 60 * 1000, // millisecond
    sameSite: "strict", // Prevent CSRF Attacks
    httpOnly: true, // Avoid XSS attacks, only accesible via browser
    secure: ENV_VARIABLES.NODE_ENV !== "development", // http -> https in deployment mode
  });

  return token;
};
