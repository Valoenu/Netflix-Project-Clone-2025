import { fetchTMDB } from "../services/themoviedatabase.service.js";

// Get Movies Trailers
export async function grabMoviesTrailers(req, res) {
  const { id } = req.params; // extract id
  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    ); // 'fetchTMDB' -> This Function comes from services folder
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      // If 404 exists
      return res.status(404).send(null); // Send nothing
    }

    res.status(500).json({ success: false, message: "Internal Error" });
  }
}

// Get Movies Details -> Display Movie details below trailer
export async function grabMoviesDetails(req, res) {
  const { id } = req.params; // extract id
  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    ); // 'fetchTMDB' -> This Function comes from services folder
    res.status(200).json({ success: true, content: data }); // Content could be movie, tv, video etc. Return -> Data
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Error" });
  }
}

// Create function for Movies Category
export async function grabMoviesFilteredByCategory(req, res) {
  const { category } = req.params; // extract category from user request
  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    ); // 'fetchTMDB' -> This Function comes from services folder
    res.status(200).json({ success: true, content: data.results }); // Content could be movie, tv, video etc.
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Error" });
  }
}

// Get Trending Movies
export async function grabMoviesFilteredByTrending(req, res) {
  try {
    const data = await fetchTMDB(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)]; // Create Random Movie

    res.json({ success: true, content: randomMovie }); // Content could be movie, tv, video etc.
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Error" });
  }
}

// Get Similar Movies
export async function grabMoviesFilteredBySimilar(req, res) {
  const { id } = req.params; // extract id from user request
  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: data.results }); // if everything was okay the return similar data
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Error" });
  }
}
