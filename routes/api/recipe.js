const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");

router
    .route("/:id")
    .get(recipeController.findById)
    // .put(recipeController.update)
    .delete(recipeController.delete);
module.exports = router;

