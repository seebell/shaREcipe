const router = require("express").Router();
const authRoutes = require("./auth");
const recipeRoutes = require("./recipes");
const signupRoutes = require("./signup")
const meRoute = require("./me")

router.use("/signup", signupRoutes)
router.use("/authenticate", authRoutes);
router.use("/me", meRoute);
router.use("/recipes", recipeRoutes);

module.exports = router;