import { fetchTMDB } from "../services/themoviedatabase.service.js";

// Create function for Tv Trailers shows
export async function grabTvTrailers(req, res) {
  const { id } = req.params; // extract id from user request
  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Create function for Tv Shows Details
export async function grabTvDetails(req, res) {
  const { id } = req.params; // extract id for tv shows
  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Create function for Tv Shows filtered by category
export async function grabTvsFilteredByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Create function for Trending Tv shows
export async function grabTvFilteredByTrending(req, res) {
  s;
  try {
    const data = await fetchTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)]; // Get random tv show

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Create function for similar Tv Shows
export async function grabTvsFilteredBySimilar(req, res) {
  const { id } = req.params; // extract id
  try {
    const data = await fetchTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
