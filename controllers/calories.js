const Calories = require("../models/Calories");
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

const getAllNutritionFacts = async (req, res) => {
  const nutritionFacts = await Calories.find({});

  res.status(StatusCodes.OK).json({
    nutritionFacts,
    count: nutritionFacts.length,
  });
};

const getNutritionFact = async (req, res) => {
  /*   const {
    user: { userId },
    params: { id: factId },
  } = req; */
  const {
    params: { id: factId },
  } = req;

  /*   const nutritionFact = await Calories.findOne({
    _id: factId,
    createdBy: userId,
  }); */
  const nutritionFact = await Calories.findOne({
    _id: factId,
  });
  res.status(StatusCodes.OK).json({ nutritionFact });
};

const createNutritionFact = async (req, res) => {
  // req.body.createdBy = req.user.userId;
  const {
    body: { product, serving, calories },
  } = req;
  if (!product || !serving || !calories) {
    throw new BadRequestError(
      "Product name, Serving size or Calories per serving fields cannot be empty"
    );
  }
  const nutritionFact = await Calories.create(req.body);
  res.status(StatusCodes.CREATED).json({ nutritionFact });
};

const updateNutritionFact = async (req, res) => {
  /*   const {
    body: { product, serving, calories },
    user: { userId },
    params: { id: factId },
  } = req; */
  const {
    body: { product, serving, calories },
    params: { id: factId },
  } = req;

  if (product === "" || serving === "" || calories === "") {
    throw new BadRequestError(
      "Product name, Serving size or Calories per serving fields cannot be empty"
    );
  }

  const nutritionFact = await Calories.findByIdAndUpdate(
    // { _id: factId, createdBy: userId },
    { _id: factId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!nutritionFact) {
    throw new NotFoundError(`No Nutrition Facts found with id ${factId}`);
  }
  res.status(StatusCodes.OK).json({ nutritionFact });
};

const deleteNutritionFact = async (req, res) => {
  /*   const {
    user: { userId },
    params: { id: factId },
  } = req; */
  const {
    params: { id: factId },
  } = req;

  /*   const nutritionFact = await Calories.findByIdAndRemove({
    _id: factId,
    createdBy: userId,
  }); */
  const nutritionFact = await Calories.findByIdAndRemove({
    _id: factId,
  });

  if (!nutritionFact) {
    throw new NotFoundError(`No Nutrition Facts found with id ${factId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Deleted" });
};

module.exports = {
  getAllNutritionFacts,
  getNutritionFact,
  updateNutritionFact,
  deleteNutritionFact,
  createNutritionFact,
};
