const { Router } = require("express");
const ctrl = require("./admin.ctrl");

const router = Router();

router.post(
  "/shops/write",

  ctrl.post_shops_write
);

module.exports = router;
