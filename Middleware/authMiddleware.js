const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authMiddleware = async (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;

  // Check if token exists and is properly formatted
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "No token provided or invalid token format",
    });
  }

  // Extract token from "Bearer <token>" string
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = {
      userid: decoded.userid,
      username: decoded.username,
    };

    // Move to next middleware/route handler
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Token has expired, please login again",
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Invalid token",
      });
    }

    // Handle any other errors
    console.error("Auth middleware error:", error.message);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Authentication failed",
    });
  }
};

module.exports = { authMiddleware };