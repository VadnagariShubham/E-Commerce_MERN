const express = require("express");

const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/product-review-controller");

const router = express.Router();

// router.post("/add", addProductReview);
router.route("/add").post(addProductReview);
router.route("/:productId").get(getProductReviews);
// router.get("/:productId", getProductReviews);

module.exports = router;