import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

// Format Date ~ ChatGPT Function
function formatDate(dateString) {
  const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract dates
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

// Create Search History Page
const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]); // Keep Track of search History State

  // "Whenever user will refresh the page -> then fetch the User Search History"
  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
        setSearchHistory(res.data.content); // Update State
      } catch (error) {
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []); // Dependencies array

  // Handle Delete Search History Event
  const handleDelete = async (entry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`); // Delete data from backend (database)
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id)); // Update State 
    } catch (error) {
      toast.error("Failed to delete search item"); // Display alert 
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  // User Interface
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {searchHistory?.map(
            // Map through search History
            (entry) => (
              <div
                key={entry.id}
                className="bg-gray-800 p-4 rounded flex items-start"
              >
                <img
                  src={SMALL_IMG_BASE_URL + entry.image} // Get image from the Store Data database
                  alt="History image"
                  className="size-16 rounded-full object-cover mr-4"
                />
                <div className="flex flex-col">
                  <span className="text-white text-lg">{entry.title}</span>
                  <span className="text-gray-400 text-sm">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>

                <span
                  className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto ${
                    entry.searchType === "movie" // lower case -> Database store
                      ? "bg-red-600"
                      : entry.searchType === "tv" // lower case -> Database store 
                      ? "bg-blue-600"
                      : "bg-green-600"
                  }`}
                >
                  {entry.searchType[0].toUpperCase() +
                    entry.searchType.slice(1)}
                </span>
                <Trash // Trash icon to delete actor 
                  className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                  onClick={() => handleDelete(entry)}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchHistoryPage;
