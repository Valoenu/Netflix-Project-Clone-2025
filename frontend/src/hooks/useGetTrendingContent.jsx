import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

// Create custom hook
const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null); // Keep track od use state
  const { contentType } = useContentStore();

  // everytime user refersh the page then render trending content
  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(res.data.content); // Update state
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};
export default useGetTrendingContent;
