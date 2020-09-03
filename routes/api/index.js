const router = require("express").Router();
const authRoutes = require("./auth");
const recipesRoutes = require("./recipes");
const signupRoutes = require("./signup")
const meRoute = require("./me")
const recipe = require('./recipe')
// const updateRecipe = require('./updateRecipe')

router.use("/signup", signupRoutes)
router.use("/authenticate", authRoutes);
router.use("/me", meRoute);
router.use("/recipes", recipesRoutes);
router.use("/recipe", recipe);
// router.use("/updateRecipe", updateRecipe);

module.exports = router;