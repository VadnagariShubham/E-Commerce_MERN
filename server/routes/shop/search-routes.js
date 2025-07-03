const express = require("express");

const { searchProducts } = require("../../controllers/shop/search-controller");

const router = express.Router();
router.route("/:keyword").get(searchProducts);


module.exports = router;