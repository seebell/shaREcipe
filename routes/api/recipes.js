const router = require("express").Router();
const recipeController = require("../../controllers/recipeController");
// /api/recipes
router
    .route("/")
    .post(recipeController.create)
    .get(recipeController.findAll);

router
    .route("/:id")
    .get(recipeController.findUserRecipes)
    .delete(recipeController.delete);

router
    .route('/:id/comments')
    .get(recipeController.getRecipeComments)


module.exports = router;