const express = require("express");

const {
  addFeatureImages,
  getFeatureImages,
} = require("../../controllers/admin/feature-controller");

const router = express.Router();

// router.post("/add", addFeatureImage);
router.route("/add").post(addFeatureImages);
// router.get("/get", getFeatureImages);
router.route("/get").get(getFeatureImages);

module.exports = router;