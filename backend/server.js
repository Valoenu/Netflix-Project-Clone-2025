import { ENV_VARIABLES } from "./config/environmentVariables.js";
import express from "express";
import { connectDatabase } from "./config/database.js";
// import path from "path";

// Import Routes
import routesAuth from "./routes/routes.auth.js";
import routesMovie from "./routes/routes.movie.js";
import routesTV from "./routes/routes.tv.js";
import routesSearch from "./routes/routes.search.js";

import { routeProtected } from "./middlewere/routeProtected.js";
import cookieParser from "cookie-parser";

// Create app with port
const app = express();
const PORT = ENV_VARIABLES.PORT;
// const __dirname = path.resolve();

app.use(cookieParser()); // This function will allow me to fetch data (Like token) from cookies.
app.use(express.json()); // Parse data from request body (req.body)

app.use("/api/v1/auth", routesAuth); // Create route
app.use("/api/v1/tv", routeProtected, routesSearch);
app.use("/api/v1/movie", routeProtected, routesMovie);
app.use("/api/v1/tv", routeProtected, routesTV);

// //Deployment process
// if (ENV_VARS.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// Listen App
app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDatabase();
});
