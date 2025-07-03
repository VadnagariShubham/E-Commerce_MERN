const express = require("express");

const {  getFilteredProducts , getProductDetails} = require("../../controllers/shop/products-controller");



const router = express.Router();

 router.route("/get").get(getFilteredProducts);
 router.route("/get/:id").get(getProductDetails);
// router.get("/get",getFilteredProducts);
module.exports = router;
