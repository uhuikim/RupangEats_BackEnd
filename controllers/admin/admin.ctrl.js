const { Router } = require("express");

const { Shops } = require("../../models/Shops");

exports.post_shops_write = async (req, res) => {
  try {
    // 위도 경도 저장
    req.body.geo = {
      type: "Point",
      coordinates: [
        // 경도
        req.body.geo.split(",")[0],
        // 위도
        req.body.geo.split(",")[1],
      ],
    };

    req.body.thumbnail = req.file ? req.file.filename : "";
    await models.Shops.create(req.body);
    res.redirect("/admin/shops");
  } catch (e) {
    console.log(e);
  }
};
