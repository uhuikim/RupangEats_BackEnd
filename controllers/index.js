const { Router } = require("express");
const router = Router();

// router.use("/admin", require("./admin"));
// router.use("/accounts", require("./accounts"));
// router.use("/auth", require("./auth"));
// router.use("/chat", require("./chat"));
// router.use("/shops", require("./shops"));
// router.use("/cart", require("./cart"));
// router.use("/checkout", require("./checkout"));
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
