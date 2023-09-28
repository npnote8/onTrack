const express = require("express");
const router = express.Router();

const {
  getAllNutritionFacts,
  getNutritionFact,
  updateNutritionFact,
  deleteNutritionFact,
  createNutritionFact,
} = require("../controllers/calories");

router.route("/").post(createNutritionFact).get(getAllNutritionFacts);
router
  .route("/:id")
  .get(getNutritionFact)
  .delete(deleteNutritionFact)
  .patch(updateNutritionFact);

module.exports = router;
