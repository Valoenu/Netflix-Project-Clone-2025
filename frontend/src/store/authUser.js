import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// Create Zustand Hook Store
export const useAuthStore = create((set) => ({
  // set state
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  // Login Features
  login: async (credentials) => {
    set({ isLoggingIn: true }); // Update logging state
    try {
      const response = await axios.post("/api/v1/auth/login", credentials); // Axios to post that into the backend
      set({ user: response.data.user, isLoggingIn: false }); // Update the user state with response from backend
    } catch (error) {
      set({ isLoggingIn: false, user: null }); // Update Logging state to false if error occur
      toast.error(error.response.data.message || "Login failed"); // display alert
    }
  },

  // Logout Features
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  // Signup Features
  signup: async (credentials) => {
    set({ isSigningUp: true }); // Update State in a Zustand way

    try {
      const response = await axios.post("/api/v1/auth/signup", credentials); // get data from backend routes
      set({ user: response.data.user, isSigningUp: false }); // Update user State in a Zustand way (Returning from the backend )
      toast.success("Account created successfully"); // display alert
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed"); // toast -> Display an alert
      set({ isSigningUp: false, user: null }); // Update Signing up state to false if error occur
    }
  },

  // Check for auth
  authCheck: async () => {
    set({ isCheckingAuth: true }); // Update State
    try {
      const response = await axios.get("/api/v1/auth/authCheck");

      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      // toast.error(error.response.data.message || "An error occurred");
    }
  },
}));
