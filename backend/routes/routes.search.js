import express from "express";
import {
  getUserSearchHistory,
  removeFromUserSearchHistory,
  searchActor,
  searchMovie,
  searchTvShow,
} from "../controllers/controller.search.js";

// Router Structure
const router = express.Router();

// Router Paths (Get, Delete)
router.delete("/history/:id", removeFromUserSearchHistory); // -> This will delete item from Search History

router.get("/history", getUserSearchHistory);
router.get("/person/:query", searchActor);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTvShow);

// Export Router
export default router;
