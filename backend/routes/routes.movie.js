// Import
import express from "express";
import {
  grabMoviesDetails,
  grabMoviesFilteredByCategory,
  grabMoviesFilteredBySimilar,
  grabMoviesFilteredByTrending,
  grabMoviesTrailers,
} from "../controllers/controller.movie.js";

// Create Router
const router = express.Router();

// Router paths with method (Get)
router.get("/:category", grabMoviesFilteredByCategory);
router.get("/popular", grabMoviesFilteredByTrending);
router.get("/:id/similar", grabMoviesFilteredBySimilar);
router.get("/:id/details", grabMoviesDetails);
router.get("/:id/trailers", grabMoviesTrailers);

// Export Router
export default router;
