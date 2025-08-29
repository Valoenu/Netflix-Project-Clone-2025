import jwt from "jsonwebtoken";
import { User } from "../models/model.user.js";
import { ENV_VARIABLES } from "../config/environmentVariables.js";

export const routeProtected = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-token-netflix-project"]; // Try to extract token from cookie, You can find the token by calling a name in the generateToken.js -> Utilities

    if (!token) {
      // If token doesn't exist
      return res.status(401).json({
        success: false,
        message: "No token was provided. Access denied - unauthorizied ",
      });
    }

    //Decode token in order to check if user is authenticayed
    const decoded = jwt.verify(token, ENV_VARIABLES.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "This Token is invalid. Access denied - unauthorizied ",
      });
    }

    // Create user from database but without a password
    const user = await User.findById(decoded.userId).select("-password"); // userId -> Payload from the token generator in utils folder

    // If user doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user; //

    next(); // call next function
  } catch (error) {
    console.log("Error occur, check middleware: ", error.message);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
};
