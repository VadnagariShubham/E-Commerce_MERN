const express = require("express");

const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/shop/address-controllers");

const router = express.Router();

router.route("/add").post(addAddress);

router.route("/get/:userId").get(fetchAllAddress);

router.route("/delete/:userId/:addressId").delete(deleteAddress);

router.route("/update/:userId/:addressId").put(editAddress);

module.exports = router;
