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
      state,
      city,
      mobile,
      email,
    } = req.body;

    if (!name || !companyName || !mobile || !email) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const registration = await User.create({
      name,
      companyName,
      division,
      designation,
      state,
      city,
      mobile,
      email,
    });
    res
      .status(201)
      .json({ message: "Registration successful", data: registration });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
}
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


module.exports={register,allUsers}