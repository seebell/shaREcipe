const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");

router
    .route("/:id")
    .get(recipeController.findById)
    .put(recipeController.update)
    .post(recipeController.addComment)
    .delete(recipeController.delete);
module.exports = router;

