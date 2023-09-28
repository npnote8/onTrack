const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

// function that protects a particular endpoint from unauthenticated users

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  // get the token from the authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Check if the token that was generated matches the token string (process.env.JWT_SECRET) entered initially
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the calories routes

    /* const user = User.findById(payload.id).select("-password");
    req.user = user; */

    // retrieve the user details of the logged in user
    // pass the user down to the endpoint

    req.user = { userId: payload.userId, name: payload.name };

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
