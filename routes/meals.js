const express = require("express");
const router = express.Router();

const {
  getAllMeals,
  getMeal,
  updateMeal,
  deleteMeal,
  createMeal,
} = require("../controllers/meals");

router.route("/").post(createMeal).get(getAllMeals);
router.route("/:id").get(getMeal).delete(deleteMeal).patch(updateMeal);

module.exports = router;
