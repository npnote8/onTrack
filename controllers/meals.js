const Meals = require("../models/Meals");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
/* 
const getAllNutritionFacts = async (req, res) => {
  const nutritionFacts = await Calories.find({
    createdBy: req.user.userId,
  });
  res
    .status(StatusCodes.OK)
    .json({ nutritionFacts, count: nutritionFacts.length });
}; */

const getAllMeals = async (req, res) => {
  const meals = await Meals.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ meals, count: meals.length });
};

const getMeal = async (req, res) => {
  const {
    user: { userId },
    params: { id: mealId },
  } = req;

  const meal = await Meals.findOne({
    _id: mealId,
    createdBy: userId,
  });
  res.status(StatusCodes.OK).json({ meal });
};

const createMeal = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const {
    body: { product, servings, servingSize, calories, totalCalories },
  } = req;
  if (!product || !servings) {
    throw new BadRequestError(
      "Product name and Servings fields cannot be empty"
    );
  }
  const meal = await Meals.create(req.body);
  res.status(StatusCodes.CREATED).json({ meal });
};

const updateMeal = async (req, res) => {
  const {
    body: { servings, totalCalories },
    user: { userId },
    params: { id: mealId },
  } = req;
  if (!servings || !totalCalories) {
    throw new BadRequestError(
      "Product name and Servings fields cannot be empty"
    );
  }

  const meal = await Meals.findByIdAndUpdate(
    { _id: mealId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!meal) {
    throw new NotFoundError(`No Meals found with id ${mealId}`);
  }
  res.status(StatusCodes.OK).json({ meal });
};

const deleteMeal = async (req, res) => {
  const {
    user: { userId },
    params: { id: mealId },
  } = req;

  const meal = await Meals.findByIdAndRemove({
    _id: mealId,
    createdBy: userId,
  });

  if (!meal) {
    throw new NotFoundError(`No Meals found with id ${mealId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Deleted" });
};

module.exports = {
  getAllMeals,
  getMeal,
  updateMeal,
  deleteMeal,
  createMeal,
};
