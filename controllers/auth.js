const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
// const { use } = require("../routes/auth");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  // to get feedback when a new user is created
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // to check if the email that the user enters on login exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // compare password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // JWT is a mechanism to verify the owner of some JSON data

  // If the password matches, then create a random token with the jwt.sign() function
  const token = user.createJWT();

  // return a success message with the token created
  // res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  res.status(StatusCodes.OK).json({ user, token });
};

module.exports = {
  register,
  login,
};
