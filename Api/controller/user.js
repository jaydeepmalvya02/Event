const express = require("express");
const User = require("../model/userModel.js");

// POST controller for registration
const register = async (req, res) => {
  try {
    const {
      name,
      companyName,
      division,
      designation,
      department,
      state,
      city,
      mobile,
      email,
      deviceInfo,
    } = req.body;

    // Validate required fields
    if (!name || !companyName || !mobile || !email) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ message: "Email already exists! Please login." });
    }

    // Create new user
    const newUser = await User.create({
      name,
      companyName,
      division,
      designation,
      department,
      state,
      city,
      mobile,
      email,
      deviceInfo,
    });

    res.status(201).json({
      message: "Registration successful",
      data: newUser,
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Get all users fromdb
const allUsers = async (req, res) => {
  try {
    const response = await User.find(); // Use await to get data from DB

    // Send the response with a 200 status code, indicating success
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Server error" }); // Handle potential errors
  }
};

const login = async (req, res) => {
  const { email, mobile } = req.body;
  console.log(req.body);

  const user = await User.findOne({ email });
  try {
    if (!user)
      return res.status(404).json({ message: "Please register first" });
    if (user) {
      if (user.mobile === req.body.mobile) {
        return res
          .status(201)
          .json({ message: "Successfully Logged In", user });
      } else {
        return res.status(401).json({ message: "Mobile number mismatch" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { register, allUsers, login };
