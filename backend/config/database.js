// This file will give me connection to the mongooDB database
import mongoose from "mongoose";
import { ENV_VARIABLES } from "./environmentVariables.js";

export const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(ENV_VARIABLES.MONGO_URI); // Create connection
    console.log("MongoDB connected: " + connect.connection.host);
  } catch (error) {
    console.error(
      "Error occur while connecting to mongoo database: " + error.message
    );
    process.exit(1);
  }
};
