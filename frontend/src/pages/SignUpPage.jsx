import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

// SignUp Page
const SignUpPage = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  // Keep track of states
  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isSigningUp } = useAuthStore(); // Destructure custom hook created in store folder

  // Handle Sign Up event when user click "Sign Up" button
  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent refreshing
    signup({ email, username, password }); // call signup function with data
  };

  // Return User Interface
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/50 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign Up
          </h1>

          <form className="space-y-4" onSubmit={handleSignUp}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block" // Email label style (block -> Takes the entire line)
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="email@example.com"
                id="email"
                value={email} // Grab value from input
                onChange={(e) => setEmail(e.target.value)} // handle onChange
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="username"
                id="username"
                value={username} // Grab value from input
                onChange={(e) => setUsername(e.target.value)} // Update the state
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="••••••••"
                id="password"
                value={password} // Grab value from input
                onChange={(e) => setPassword(e.target.value)} // Update the state of password
              />
            </div>

            <button
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700
						"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a member?{" "}
            <Link to={"/login"} className="text-gray-100 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
