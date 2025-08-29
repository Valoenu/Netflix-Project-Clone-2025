import axios from "axios";
import { ENV_VARIABLES } from "../config/environmentVariables.js";

// Create Service Function -> This function will execute fetching api from tmdb
export const fetchTMDB = async (url) => {
  const options = {
    headers: {
      method: "GET",
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARIABLES.TMDB_API_KEY,
    },
  };

  const response = await axios.get(url, options); // Fetch data with axios, options (Get, Post, Put, Delete)

  // Error Handling
  if (response.status !== 200) {
    throw new Error(
      "Cannot fetch data from themoviedatabase" + response.statusText
    );
  }

  return response.data;
};
