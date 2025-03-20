const express = require("express");
const router = express.Router();

// Import the authMiddleware function
const {authMiddleware} = require("../Middleware/authMiddleware");

router.get("/all-questions", (req, res) => {
  res.send("Welcome to the question route");
});


module.exports = router