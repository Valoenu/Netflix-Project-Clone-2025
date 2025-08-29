import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

// Create Search Page
const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  // Handle Event
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update Event State
    tab === "movie" ? setContentType("movie") : setContentType("tv"); // Optionally update state
    setResults([]); // Update Results State -> Initial Value -> If user click on the other category then the previous results will be deleted from UI
  };

  // Handle Search State
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent refreshing page
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`); // Get data from backend
      setResults(res.data.content);
    } catch (error) {
      // Error Handling
      if (error.response.status === 404) {
        toast.error("Nothing found");
      } else {
        toast.error("Error occured, try once again"); // Display error alert
      }
    }
  };

  // Return User Interface
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          {" "}
          {/* Parent div that will hold buttons */}
          <button
            className={`py-2 px-4 rounded ${
              // Dynamics classes
              activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("movie")} // Handle actionx
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>

        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input // Input element that will allow users to search for the items
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update state
            placeholder={"Search for a " + activeTab}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            // Map through results and for each retun UI
            if (!result.poster_path && !result.profile_path) return null; // Optimatization process, if actors don't have a image then don't render them

            return (
              <div key={result.id} className="bg-gray-800 p-4 rounded">
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </div>
                ) : (
                  // Content below will be either Movie or Tv Show
                  <Link
                    to={"/watch/" + result.id}
                    onClick={() => {
                      setContentType(activeTab);
                    }}
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.title || result.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
