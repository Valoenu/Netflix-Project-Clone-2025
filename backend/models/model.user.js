import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    reuired: true,
    unique: true,
  },
  email: {
    type: String,
    reuired: true,
    unique: true,
  },
  password: {
    type: String,
    reuired: true,
  },
  image: {
    type: String,
    default: "",
  },
  searchHistory: {
    type: Array,
    default: [], // empty array by default
  },
});

export const User = mongoose.model("User", userSchema); // Create User Collection based on this user schema, name it Singular and Uppercase for mongoose
