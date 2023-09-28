const mongoose = require("mongoose");

const MealsSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: [true, "Please provide product name"],
      maxlength: 50,
    },
    servings: {
      type: Number,
      required: [true, "Please provide serving size"],
    },
    servingSize: {
      type: Number,
    },
    calories: {
      type: Number,
    },
    totalCalories: {
      type: Number,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meals", MealsSchema);
