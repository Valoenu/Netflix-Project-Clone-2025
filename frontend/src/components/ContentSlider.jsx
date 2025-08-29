import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Create Content Slider Component
const ContentSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);

  // Parent Refference
  const sliderRef = useRef(null);

  // Format Categories Names
  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`); // Call axios.get in order to get categories from. backend
      setContent(res.data.content);
    };

    getContent();
  }, [contentType, category]);

  // Function that allow me to scroll in the right direction
  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  // Function that allow me to scroll in the left direction
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth, // '-' minus to scroll
        behavior: "smooth",
      });
    }
  };

  // Return User Interface
  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseLeave={() => setShowArrows(false)}
      onMouseEnter={() => setShowArrows(true)} // Update Mouse State
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content.map(
          // Map through each item and render for each link with link
          (item) => (
            <Link // This will redirect users for watch
              to={`/watch/${item.id}`}
              className="min-w-[250px] relative group"
              key={item.id} // I have to make it unique becouse i use map method to loop
            >
              <div className="rounded-lg overflow-hidden">
                <img
                  src={SMALL_IMG_BASE_URL + item.backdrop_path} // Image for the movie
                  alt="Movie image"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-125" // Scaling image
                />
              </div>
              <p className="mt-2 text-center">{item.title || item.name}</p>
            </Link>
          )
        )}
      </div>

      {showArrows && (
        <>
          <button // Button for scroll in the left side scrolling
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button // Button for scroll in the right side scrolling
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};
// Export Content Slider in order to make it reusable
export default ContentSlider;
