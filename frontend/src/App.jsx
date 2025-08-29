import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authUser";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useEffect } from "react";

// Import Components
import Footer from "./components/Footer";

// Import Pages
import NotFoundPage from "./pages/404";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";

// Create App
function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore(); // Destructure data from Zustand Store Hook

  // "Everytime user refresh the page -> Check for authentication"
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    // If is checking authentiaction then render the loader∆
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  // Return User Interface
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login" // Redirect into login page
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup" // Navigate user to the signup page
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/history"
          element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />}
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />

      <Toaster />
    </>
  );
}

// Export App
export default App;
