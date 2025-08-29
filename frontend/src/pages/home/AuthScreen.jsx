import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Create Auth Screen
const AuthScreen = () => {
  const [email, setEmail] = useState(""); // Keep track of email state
  const navigate = useNavigate(); // It will allow me to navigate users

  // Handle form submit event
  const handleFormSubmit = (e) => {
    e.preventDefault(); // prevent refreshing page
    navigate("/signup?email=" + email); // Redirect user with email that he provide
  };

  // Return User Interface
  return (
    <div className="hero-bg relative">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img
          src="/netflix-logo.png"
          alt="Netflix Logo"
          className="w-32 md:w-52"
        />
        <Link
          to={"/login"}
          className="text-white bg-black py-1 px-2 rounded text-lg"
        >
          Sign In
        </Link>
      </header>

      {/* hero section */}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white/90 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited Movies, TV Shows & More
        </h1>
        <p className="text-lg mb-4">
          Watch anywhere. Cancel subscriptions anytime you want.
        </p>
        <p className="mb-4">
          Enter your email to create or restart your membership and start
          streaming unlimited entertainment instantly on any device.
        </p>

        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormSubmit} // handle submit event
        >
          <input
            type="email"
            placeholder="Email address"
            className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
            value={email} // Get email value from password
            onChange={(e) => setEmail(e.target.value)} // Update Email State
          />
          <button className="bg-red-900/70 hover:bg-red-800/80 text-white font-semibold text-xl lg:text-2xl px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
            Get Started
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-gray-600/30" aria-hidden="true" />

      {/* 1st section */}
      <div className="py-10 bg-black/80 text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy your favorite movies anytime, anywhere.
            </h2>
            <p className="text-lg md:text-xl bg-gradient-to-r from-white/80 to-gray-400/80 bg-clip-text text-transparent">
              Watch seamlessly across Apple TV, Smart TVs, desktops, tablets,
              phones, Chromecast, Blu-ray players, and more—so you’re never
              limited to just one screen.
            </p>
          </div>
          {/* right side -> Animated video*/}
          <div className="flex-1 relative">
            <img
              src="/Macbook.png"
              alt="Tv image"
              className="mt-4 z-20 relative"
            />
            <video // It allows me to display a video image in the background
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay={true}
              muted //
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 2nd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          {/* left side */}
          <div className="flex-1 relative">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="Stranger Things img"
                className="mt-4"
              />
              <div
                className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black
              w-3/4 lg:w-1/2 h-24 border border-gray-600/70 rounded-md px-2
              "
              >
                <img src="/thePursuit2.png" alt="image" className="h-full" />
                <div className=" flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      The Pursuit of Happyness
                    </span>
                    <span className="text-sm bg-gradient-to-r from-white to-black bg-clip-text text-transparent">
                      Downloading...
                    </span>
                  </div>

                  <img src="/download-icon.gif" alt="" className="h-12" />
                </div>
              </div>
            </div>
          </div>
          {/* right side */}

          <div className="flex-1 md:text-left text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Save shows and movies to watch later
            </h2>
            <p className="text-lg md:text-xl bg-gradient-to-r from-white/80 to-gray-400/80 bg-clip-text text-transparent">
              Build your own personal library of movies and shows with just a
              tap, so you can return to them anytime—whether you are at home, on
              the go, or offline.
            </p>
          </div>
        </div>
      </div>

      {/* separator */}

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 3rd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl bg-gradient-to-r from-white/80 to-gray-400/80 bg-clip-text text-transparent">
              Enjoy seamless entertainment wherever you are, anytime you want,
              on any device you choose—no limits, no interruptions.
            </p>
          </div>

          {/* right side */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/Macbook.png"
              alt="Device image"
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute bottom-2 top-2 left-1/2 -translate-x-1/2  h-4/6 z-10
               max-w-[63%] 
              "
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 4th section*/}
      <div className="py-10 bg-black text-white">
        <div
          className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row
           px-4 md:px-2
        "
        >
          {/* left */}
          <div className="flex-1 relative">
            <img src="/kids.png" alt="Enjoy on your TV" className="mt-4" />
          </div>
          {/* right */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Set up kids profiles so the whole family can watch safely.
            </h2>
            <p className="text-lg md:text-xl bg-gradient-to-r from-white/80 to-gray-400/80 bg-clip-text text-transparent">
              Let kids explore a world of fun with their favorite
              characters—completely free with your membership.
            </p>
            <p className="text-lg md:text-xl bg-gradient-to-r from-white/80 to-gray-400/80 bg-clip-text text-transparent">
              From exciting adventures to educational shows, this safe,
              dedicated space lets them watch, learn, and play anytime, all
              while giving parents peace of mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthScreen;
