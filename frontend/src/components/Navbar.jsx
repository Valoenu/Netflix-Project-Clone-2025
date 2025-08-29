import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

// Create Navbar component
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Keep track of mobile menu open state
  const { logout } = useAuthStore(); // Destructure data from custom hook // add user and below to make avatar

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const { setContentType } = useContentStore();

  // Return User Interface
  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        {/* Navbar for Desktop Version */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link // Link in order to redirect user to the homepage
            to="/"
            className="hover:underline"
            onClick={() => setContentType("movie")} // Update the state
          >
            Movies
          </Link>
          <Link // Link in order to redirect user to the homepage
            to="/"
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link to="/history" className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src="firstAvatar.png" //{user.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* Navbar for mobile devices */}
      {isMobileMenuOpen && ( // Check if is Mobile Menu Open
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link // Link in order to redirect user to the homepage
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu} // Handle event
          >
            Movies
          </Link>
          <Link // Link in order to redirect user to the homepage
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu} // Handle event state
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};
export default Navbar;
