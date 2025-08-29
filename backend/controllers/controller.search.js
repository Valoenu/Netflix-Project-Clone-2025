import { User } from "../models/model.user.js";
import { fetchTMDB } from "../services/themoviedatabase.service.js";

// Search value and get from user request -> Save into database

// Create Search Actor function
export async function searchActor(req, res) {
  const { query } = req.params; // extract query from user
  try {
    const response = await fetchTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    ); // Put user query into the endpoint in order to search person. Api from TMBD

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    // Find user by id
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id, // Id of the person, first result [0]
          image: response.results[0].profile_path, //
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(), // Current CreatedAt Date
        },
      },
    });

    res.status(200).json({ success: true, content: response.results }); // Return content with response (results -> TMDB Api requriements)
  } catch (error) {
    console.log("Error occur, check searchActor controller", error.message);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
}

// Create Search TV Show Function
export async function searchTvShow(req, res) {
  const { query } = req.params; // get query from user request

  try {
    const response = await fetchTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    ); // Put user query into endpoint in order to fetch Tv Show

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path, // Value for frontend
          title: response.results[0].name,
          searchType: "tv", // type of tv
          createdAt: new Date(),
        },
      },
    });
    res.json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error occur, check searchTvShow controller", error.message);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
}

// Create Search Movie Function
export async function searchMovie(req, res) {
  const { query } = req.params; // extract query from user request

  try {
    const response = await fetchTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    // If there isn't any result
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(), // CreatedAt date
        },
      },
    });
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error occur, check searchMovie controller", error.message);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
}

// Create get UserSearchHistory Function -> Fetch user search history
export async function getUserSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory }); // Return search history
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Error" });
  }
}

// Create removeFromUserSearchHistory -> Remove item from search history
export async function removeFromUserSearchHistory(req, res) {
  let { id } = req.params; // extract id

  id = parseInt(id); // Prevent error, Id must be a string dataype

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        // $pull -> Mongoose syntax, remove somethhing
        searchHistory: { id: id },
      },
    });

    res.status(200).json({
      success: true,
      message: "Success -> removed from Search History",
    });
  } catch (error) {
    console.log(
      "Error occur, check removeFromUserSearchHistory controller ",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal Error" });
  }
}
