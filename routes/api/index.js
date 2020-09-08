const router = require("express").Router();
const authRoutes = require("./auth");
const recipesRoutes = require("./recipes");
const signupRoutes = require("./signup")
const meRoute = require("./me")
const recipe = require('./recipe')

router.use("/signup", signupRoutes)
router.use("/authenticate", authRoutes);
router.use("/me", meRoute);
router.use("/recipes", recipesRoutes);
router.use("/recipe", recipe);

module.exports = router;