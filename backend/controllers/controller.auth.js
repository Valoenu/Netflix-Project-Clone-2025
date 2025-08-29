import bcryptjs from "bcryptjs";
import { User } from "../models/model.user.js";
import { createTokenThenSetCookie } from "../utilities/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body; // get data from user

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields must be filled" });
    }

    // Check for email
    const emailReqex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailReqex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email is invalid" });
    }

    if (email.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Email must have at least 8 characters long",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Handle case where user username already exist
    const userAlreadyExistByUsername = await User.findOne({
      username: username,
    }); // Find user by username

    if (userAlreadyExistByUsername) {
      return res.status(400).json({
        success: false,
        message: "This username already exists, Check your name once again",
      });
    }

    // Handle case where user email already exist
    const userAlreadyExistByEmail = await User.findOne({ email: email }); // Find user by email

    if (userAlreadyExistByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "This Email already exists" });
    }

    // Pick a profile image for user
    const PROFILE_IMAGE = [
      "/firstAvatar.png",
      "/secondAvatar.png",
      "/thirdAvatar.png",
      "/forthAvatar.png",
    ];

    //Pick randomly profile image
    const image =
      PROFILE_IMAGE[Math.floor(Math.random() + PROFILE_IMAGE.length)]; // Pick random index

    //Hash password in order to make it more secure
    const salt = await bcryptjs.genSalt(10);
    const passwordHashed = await bcryptjs.hash(password, salt); // Hash password with Salt

    // Create new User
    const newUser = new User({
      email: email,
      image: image,
      username: username,
      password: passwordHashed,
    });

    createTokenThenSetCookie(newUser._id, res); // _id -> comes from generateTokenThenMakeCookie function (userId)
    await newUser.save(); // Save new created user into the database

    res.status(200).json({
      ssuccess: true,
      user: {
        // return user data
        ...newUser._doc,
        password: "", // Remove password here
      },
    });
  } catch (error) {
    console.log("Error occur, check signup controller", error.message); // For Debugging purposes
    res.status(500).json({ success: false, message: "Internal Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // check for email and password
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email }); // find user by email
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const passwordIsCorrect = await bcryptjs.compare(password, user.password); // Compare bcrypt database password with password which user provide

    if (!passwordIsCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    createTokenThenSetCookie(user._id, res); // Create new token

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error occur, check login controller", error.message);
    res.status(500).json({ success: false, message: "Internal error" });
  }
}

// Handle Logout Function -> Clear out the cookies only
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-token-netflix-project"); // Clear cookie here
    res.status(200).json({ success: true, message: "Success logged out" });
  } catch (error) {
    console.log("Error occur, check login controller", error.message);
    res.status(500).json({ success: false, message: "Internal error" });
  }
}

// Handle Authentication Check Function
export async function authCheck(req, res) {
  try {
    console.log("req.user:", req.user);
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error occur, check authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal error" });
  }
}
