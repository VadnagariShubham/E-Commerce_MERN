const express = require("express");

const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");

const router = express.Router();


router.route("/get").get(getAllOrdersOfAllUsers);
router.route("/details/:id").get(getOrderDetailsForAdmin);
router.route("/update/:id").put(updateOrderStatus);


module.exports = router;