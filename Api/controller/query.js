const Query = require("../model/queryModel");
const User = require("../model/userModel");

// Controller to submit a new question
const askQuestion = async (req, res) => {
  try {
    // Ensure the question text is provided
    const { question, email } = req.body;
    const user = User.findOne({ email });
    if (!user || !question) {
      return res.status(401).json({ message: "User not authenticated." });
    } else {
      if (!question) {
        return res.status(400).json({ message: "Question text is required." });
      } else {
        const newQuery = await Query.create({
          question,
          email,
        });
        res.status(201).json({
          message: "Question submitted successfully.",
          query: newQuery,
        });
      }
    }
  } catch (error) {
    console.error("Error submitting question:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Controller to get all questions
const getQueries = async (req, res) => {
  try {
    // Retrieve all queries and populate user details (name and email)
    const queries = await Query.find();
    res.status(200).json(queries);
  } catch (error) {
    console.error("Error retrieving queries:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { askQuestion, getQueries };
