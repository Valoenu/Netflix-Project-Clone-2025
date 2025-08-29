import express from "express";
import {
  grabTvDetails,
  grabTvFilteredByTrending,
  grabTvsFilteredByCategory,
  grabTvsFilteredBySimilar,
  grabTvTrailers,
} from "../controllers/controller.tv.js";

// Create router
const router = express.Router();

// Router paths
router.get("/:id/trailers", grabTvTrailers);
router.get("/:id/details", grabTvDetails);
router.get("/:category", grabTvsFilteredByCategory);
router.get("/:id/similar", grabTvsFilteredBySimilar);
router.get("/trending", grabTvFilteredByTrending);

// Export Router
export default router;
