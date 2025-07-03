const express = require("express");
const { handleImageUpload ,addProduct,
    editProduct,
    deleteProduct,
    fetchAllProducts } = require("../../controllers/admin/products-controller");
const { upload } = require("../../helper/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);

router.route("/add").post(addProduct);
router.route("/edit/:id").put(editProduct);
router.route("/delete/:id").delete(deleteProduct);
router.route("/get").get(fetchAllProducts);

module.exports = router;
