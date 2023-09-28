const mongoose = require("mongoose");

const CaloriesSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: [true, "Please provide product name"],
      maxlength: 50,
    },
    serving: {
      type: Number,
      required: [true, "Please provide serving size"],
    },
    calories: {
      type: Number,
      required: [true, "Please provide calories per serving"],
    },
    fat: {
      type: Number,
    },
    cholesterol: {
      type: Number,
    },
    sodium: {
      type: Number,
    },
    carbohydrate: {
      type: Number,
    },
    protein: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Calories", CaloriesSchema);
