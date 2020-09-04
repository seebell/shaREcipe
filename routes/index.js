const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
// router.get("*", function(req, res) {
  
router.use(function(req, res) {
  res.sendFile(express.static(path.join(__dirname, "../client/build/index.html")));
});

module.exports = router;